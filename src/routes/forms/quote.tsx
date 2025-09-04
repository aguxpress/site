import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Select from "src/components/ui/Select";

export default function QuoteForm() {
  return (
    <section aria-label="get-quote" id="get-quote">
      <div className="container">
        <p className="headline">Get a Quote</p>
        <h2>Request Delivery Quote</h2>

        <form
          action="THIRD PARTY FORM ACTION LINK"
          method="post"
          className="contact-form"
        >
          <label htmlFor="serviceType">Type</label>
          <Select
            id="serviceType"
            options={[
              { label: "For a Package Delivery", value: "package_delivery" },
              { label: "For Haulage Service", value: "haulage_service" },
            ]}
          />

          <label htmlFor="itemType">Item Type</label>
          <Input id="itemType" type="text" required />

          <label htmlFor="pickupLocation">Pickup Location</label>
          <Input id="pickupLocation" type="text" required />

          <label htmlFor="deliveryLocation">Delivery Location</label>
          <Input id="deliveryLocation" type="text" required />

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

          <label htmlFor="typeOfItems">Type of Items</label>
          <Select
            id="typeOfItems"
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

          <label htmlFor="volumeWeight">Estimated Volume/Weight</label>
          <Input id="volumeWeight" type="text" required />

          <label htmlFor="vehicle">Preferred Vehicle</label>
          <Select
            id="vehicle"
            options={[
              { label: "Motorcycle", value: "motorcycle" },
              { label: "Van", value: "van" },
              { label: "Mini Truck", value: "mini_truck" },
              { label: "Large Truck", value: "large_truck" },
              { label: "Other", value: "other" },
            ]}
          />

          <label htmlFor="deliverySpeed">Delivery Speed</label>
          <Select
            id="deliverySpeed"
            options={[
              { label: "Same Day", value: "same_day" },
              { label: "Expedite (2-3 days)", value: "expedite" },
              { label: "Standard (3-6 days)", value: "standard" },
            ]}
          />

          <Button type="submit">Get Quote</Button>
        </form>
      </div>
    </section>
  );
}
