const orderSteps = {
  Confirmed: "Your order is confirmed and being prepared for delivery",
  "In Transit": "Your order is on its way and will arrive soon",
  Delivered: "Your order has been successfully delivered",
  Cancelled: null,
} satisfies Record<string, string | null>;

const serviceType = ["Dispatch", "Haulage"] as const;

const orderTables = {
  AXD: "Domestic",
  AXS: "Inter_State",
  AXI: "Overseas",
} as const;

export { orderSteps, serviceType, orderTables };
