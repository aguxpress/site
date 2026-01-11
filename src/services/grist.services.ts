import type { GristClientData, GristRecords } from "@/types/grist.types";
import { orderTables, orderSteps } from "@data/tracking.data";
import { env } from "@utils/env.server";
import { dataError } from "@utils/helpers.server";

// More grist connections will necessitate
// a separate function for just API connection
// Might need a JavaScript class for that
async function fetchGristRecords<T>(tableID: string, params: URLSearchParams) {
  const res = await fetch(`${env.GRIST_URL}/${tableID}/records?${params}`, {
    headers: {
      Authorization: `Bearer ${env.GRIST_KEY}`,
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as T;
}

function validateId(prefix: string): prefix is keyof typeof orderTables {
  return Object.keys(orderTables).includes(prefix);
}

export async function fetchOrderByTrackingId(trackingId: string) {
  let prefix = trackingId.slice(0, 3);
  if (!validateId(prefix)) return dataError("Invalid Tracking ID");
  const tableID = orderTables[prefix];

  const params = new URLSearchParams({
    filter: JSON.stringify({
      Tracking_ID: [trackingId],
      Order_Status: Object.keys(orderSteps),
    }),
    hidden: "true",
    limit: "1",
  });

  const row = await fetchGristRecords<GristRecords>(tableID, params);

  if (
    !row.records.length ||
    row.records[0].fields.Order_Status === "Cancelled"
  ) {
    return dataError("No available records", 404);
  }

  const result: GristClientData = {
    ...row.records[0].fields,
    overseas: orderTables[prefix] === "Overseas",
  };

  return result;
}
