import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Select from "src/components/ui/Select";

export default function Escrow() {
  return (
    <section
      aria-label="request-quote-insurance-escrow"
      id="request-quote-insurance-escrow"
    >
      <div className="container">
        <p className="headline">Request Quote</p>
        <h2>Insurance or Escrow</h2>

        <form
          action="THIRD PARTY FORM ACTION LINK"
          method="post"
          className="contact-form"
        >
          <label htmlFor="serviceType">Service Type</label>
          <Select
            id="serviceType"
            options={[
              { label: "Insurance", value: "insurance" },
              { label: "Escrow", value: "escrow" },
            ]}
          />

          <label htmlFor="itemDescription">Item Description</label>
          <Input id="itemDescription" type="text" required />

          <label htmlFor="itemValue">Item Value (₦)</label>
          <Input id="itemValue" type="number" required />

          <label htmlFor="holdDuration">
            Physical Hold Duration for Escrow
          </label>
          <Input
            id="holdDuration"
            type="text"
            placeholder="Put NA if not applicable"
          />

          <label htmlFor="deliveryRange">
            Delivery Distance or Location Range
          </label>
          <Input id="deliveryRange" type="text" required />

          <label htmlFor="additionalNotes">Additional Notes (Optional)</label>
          <Input
            variant="textarea"
            id="additionalNotes"
            rows={4}
            placeholder="E.g., special instructions or considerations"
          />

          <Button type="submit">Request Estimate</Button>
        </form>
      </div>
    </section>
  );
}
