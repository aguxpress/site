import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Select from "src/components/ui/Select";
import type { Route } from "./+types/pickup";

export function clientLoader({}: Route.ClientLoaderArgs) {
  return "hi";
}

export default function Pickup() {
  return (
    <section aria-label="schedule-pickup" id="schedule-pickup">
      <div className="container">
        <p className="headline">Schedule a Pickup</p>
        <h2>Book a Pickup</h2>
        <form
          action="THIRD PARTY FORM ACTION LINK"
          method="post"
          className="contact-form"
        >
          <label htmlFor="type">Type (Package, Haulage)</label>
          <Select
            id="type"
            options={[
              { label: "Package", value: "package" },
              { label: "Haulage", value: "haulage" },
            ]}
          />

          <label htmlFor="contactName">Contact Name</label>
          <Input id="contactName" type="text" required />

          <label htmlFor="contactNumber">Contact Number</label>
          <Input id="contactNumber" type="tel" required />

          <label htmlFor="pickupAddress">Pickup Address/Location</label>
          <Input id="pickupAddress" type="text" required />

          <label htmlFor="preferredDateTime">Preferred Pickup Date/Time</label>
          <Input id="preferredDateTime" type="datetime-local" required />

          <label htmlFor="packageType">
            Type of Package / Item Description
          </label>
          <Input id="packageType" type="text" required />

          <label htmlFor="destination">
            Destination Address (if not AguXpress dropoff point)
          </label>
          <Input id="destination" type="text" />

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

          <label htmlFor="additionalInstructions">
            Additional Instructions / Special Needs (Optional)
          </label>
          <Input
            variant="textarea"
            id="additionalInstructions"
            rows={4}
            placeholder="E.g., I need a covered vehicle, I need offloaders/labourers, etc."
          />

          <Button type="submit">Book Pickup</Button>
        </form>
      </div>
    </section>
  );
}
