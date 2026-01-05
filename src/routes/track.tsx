import { Form, useNavigation, useSearchParams } from "react-router";
import { MdOutlineError, MdCheck } from "react-icons/md";
import type { Route } from "./+types/track";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { env } from "@utils/env.server";

const orderStatuses = ["Confirmed", "In Transit", "Delivered"] as const;
const services = ["Dispatch", "Haulage"] as const;

interface GristRes {
  records: {
    id: number;
    fields: {
      dev_sender: string;
      Service_Type: (typeof services)[number];
      Order_Status: (typeof orderStatuses)[number];
      Tracking_ID: string;
    };
  }[];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  try {
    const trackingId = url.searchParams.get("id")?.toUpperCase();
    if (!trackingId) throw new Error("No Table ID");

    // maybe change to a const object in the future
    const tableId = trackingId.startsWith("AXD-")
      ? "Domestic"
      : trackingId.startsWith("AXS-")
        ? "Inter_State"
        : null;

    const tableURL = new URL(`${env.GRIST_URL}/${tableId}/records`);
    tableURL.searchParams.append(
      "filter",
      JSON.stringify({
        Tracking_ID: [trackingId],
        // Order_Status: orderStatuses,
        // Service_Type: services,
      }),
    );
    tableURL.searchParams.append("hidden", "true");
    const res = await fetch(tableURL, {
      headers: {
        Authorization: `Bearer ${env.GRIST_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error("Something went wrong");

    const data: GristRes = await res.json();
    if (!data.records.length) throw Error("No available records");

    return data.records[0].fields;
  } catch {
    return null;
  }
}

const steps: { name: (typeof orderStatuses)[number]; desc: string }[] = [
  // If we ever need to diverge from what is on Grist, just add a field in the child that contains the fetched name
  {
    name: "Confirmed",
    desc: "Your order is confirmed and being prepared for delivery",
  },
  {
    name: "In Transit",
    desc: "Your order is on its way and will arrive soon",
  },
  {
    name: "Delivered",
    desc: "Your order has been successfully delivered",
  },
];

export default function Track({ loaderData }: Route.ComponentProps) {
  const { state } = useNavigation();
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get("id") ?? "";
  const hasId = !!trackingId.trim();

  let activeIndex = steps.findIndex(
    (val) => val.name === loaderData?.Order_Status,
  );

  return (
    <section aria-label="Track Package">
      <div className="container">
        <span className="headline">Getting Started</span>
        <h2>Track your AguXpress Order</h2>
        <Form method="get">
          <span className="flex gap-5 pt-5">
            <Input
              type="search"
              name="id"
              placeholder="Tracking ID"
              defaultValue={trackingId}
              className="m-0"
            />
            <Button disabled={state !== "idle"}>Track</Button>
          </span>
          {hasId && (
            <div className="bg-ax-white-d input-shadow my-10 rounded-xs p-5">
              {loaderData ? (
                <>
                  <span>
                    Sender:{" "}
                    <span className="inline font-medium">
                      {loaderData.dev_sender}
                    </span>
                  </span>
                  <span>
                    Service Type:{" "}
                    <span className="inline font-medium">
                      {loaderData.Service_Type}
                    </span>
                  </span>
                  <span className="mt-2 mb-8 text-xs">
                    Tracking ID: {loaderData.Tracking_ID}
                  </span>

                  <div>
                    {steps.map(({ name, desc }, index) => {
                      const isActive = index === activeIndex;
                      const isReachedStep = index <= activeIndex;

                      return (
                        <div
                          key={name}
                          className={`relative pb-6 after:absolute after:top-8 after:bottom-0 after:left-2.25 after:block not-last-of-type:after:border-l-2 ${isReachedStep ? "after:border-ax-red-a/30" : "after:border-gray-200"}`}
                        >
                          <header className="flex min-h-8 items-center">
                            <span
                              className={`mr-5 flex size-5 items-center justify-center rounded-full ${isActive || isReachedStep ? "bg-ax-red-a/50" : "bg-gray-200"}`}
                            >
                              {isActive || isReachedStep ? (
                                <MdCheck className="text-2xl text-white" />
                              ) : (
                                <span className="text-xs/0 text-gray-400">
                                  {index + 1}
                                </span>
                              )}
                            </span>
                            <span
                              className={`rounded-sm px-4 py-0.5 ${isActive || isReachedStep ? "bg-ax-red-a/60 text-white" : "bg-gray-200 text-gray-500"}`}
                            >
                              {name}
                            </span>
                          </header>
                          {isActive && (
                            <span className="ml-10 py-2 text-sm">{desc}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <MdOutlineError className="text-ax-red-d/50 mr-3 inline text-3xl" />{" "}
                  Tracking ID Not Found
                </>
              )}
            </div>
          )}
        </Form>
      </div>
    </section>
  );
}
