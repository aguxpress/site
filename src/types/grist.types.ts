import { serviceType, orderSteps } from "@data/tracking.data";

interface RowData {
  dev_sender: string;
  Service_Type: typeof serviceType;
  Order_Status: keyof typeof orderSteps;
  Tracking_ID: string;
  del_name?: string;
  del_phone?: string;
  Country?: string;
}

export interface GristRecords {
  records: {
    id: number;
    fields: RowData;
  }[];
}

export type GristClientData = RowData & { overseas: boolean };
