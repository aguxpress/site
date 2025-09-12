import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Select from "src/components/ui/Select";

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

          <label htmlFor="contact_name">Contact Name</label>
          <Input id="contact_name" type="text" required />

          <label htmlFor="contact_number">Contact Number</label>
          <Input id="contact_number" type="tel" required />

          <label htmlFor="pickup_address">Pickup Address/Location</label>
          <Input id="pickup_address" type="text" required />

          <label htmlFor="date_time">Preferred Pickup Date/Time</label>
          <Input id="date_time" type="datetime-local" required />

          <label htmlFor="package_type">
            Type of Package / Item Description
          </label>
          <Input id="package_type" type="text" required />

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

          <label htmlFor="instructions">
            Additional Instructions / Special Needs (Optional)
          </label>
          <Input
            variant="textarea"
            id="instructions"
            rows={4}
            placeholder="E.g., I need a covered vehicle, I need offloaders/labourers, etc."
          />

          <Button type="submit">Book Pickup</Button>
        </form>
      </div>
    </section>
  );
}
