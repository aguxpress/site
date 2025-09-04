import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

export default function Ship() {
  return (
    <section aria-label="ship-items" id="ship-items">
      <div className="container">
        <p className="headline">Ship/Move a Package or Items</p>
        <h2>Request a Shipment</h2>

        <form
          action="THIRD PARTY FORM ACTION LINK"
          method="post"
          className="contact-form"
        >
          <label htmlFor="type">Type (Parcel, Haulage)</label>
          <Input id="type" type="text" required />

          <label htmlFor="sender">Requester’s/Sender’s Full Name</label>
          <Input id="sender" type="text" required />

          <label htmlFor="contact">Contact Number</label>
          <Input id="contact" type="tel" required />

          <label htmlFor="pickup">Pickup Address</label>
          <Input id="pickup" type="text" required />

          <label htmlFor="delivery">Delivery Address</label>
          <Input id="delivery" type="text" required />

          <label htmlFor="packageType">Package Type</label>
          <Select
            id="packageType"
            options={[
              { label: "Small Parcel", value: "small" },
              { label: "Medium Parcel", value: "medium" },
              { label: "Large/Bulk Goods", value: "large" },
              { label: "Home/Office", value: "home_office" },
              { label: "Other", value: "other" },
            ]}
          />

          <label htmlFor="itemType">Type of Items</label>
          <Select
            id="itemType"
            options={[
              { label: "Document", value: "document" },
              { label: "Beauty/Cosmetics", value: "beauty" },
              { label: "Fragile Item", value: "fragile" },
              { label: "Liquid", value: "liquid" },
              { label: "Furniture", value: "furniture" },
              { label: "Equipment", value: "equipment" },
              { label: "Building Materials", value: "building_materials" },
              { label: "Household/Office items", value: "household_office" },
              { label: "Others", value: "others" },
            ]}
          />

          <label htmlFor="weight">Package Weight/Volume (kg)</label>
          <Input
            id="weight"
            type="text"
            placeholder="Put NA if sending in bulk"
          />

          <label htmlFor="deliverySpeed">Preferred Delivery Speed</label>
          <Select
            id="deliverySpeed"
            options={[
              { label: "Same Day", value: "same_day" },
              { label: "Expedite (2-3 days)", value: "expedite" },
              { label: "Standard (3-6 days)", value: "standard" },
            ]}
          />

          <label htmlFor="recipientName">Recipient's Full Name</label>
          <Input id="recipientName" type="text" required />

          <label htmlFor="recipientPhone">Recipient's Phone Number</label>
          <Input id="recipientPhone" type="tel" required />

          <label htmlFor="vehicleType">Vehicle Type Needed</label>
          <Select
            id="vehicleType"
            options={[
              { label: "Motorcycle", value: "motorcycle" },
              { label: "Van", value: "van" },
              { label: "Mini Truck", value: "mini_truck" },
              { label: "Large Truck", value: "large_truck" },
              { label: "Other", value: "other" },
            ]}
          />

          <label htmlFor="notes">Notes/Special Handling Needs (Optional)</label>
          <Input
            variant="textarea"
            id="notes"
            rows={4}
            placeholder="I need a covered vehicle, I need off-loaders/labourers, etc."
          />

          <Button type="submit">Submit Request</Button>
        </form>
      </div>
    </section>
  );
}
