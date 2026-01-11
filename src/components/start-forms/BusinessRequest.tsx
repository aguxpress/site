import Input from "@shared/Input";
import Label from "@shared/Label";
import Select from "@shared/Select";

export interface BusinessRequestOpts {
  service_description: string;
  frequency: string;
  comments: string;
}

export default function BusinessRequest({
  value,
  onChange,
}: {
  value: BusinessRequestOpts;
  onChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;
}) {
  return (
    <>
      <Label
        info="AguXpress offers multiple services to businesses such as Pickup/Delivery, Warehousing, Escrow, Haulage, and Insurance. Describe the services you want below."
        htmlFor="service_description"
      >
        Service Request
      </Label>
      <Input
        name="service_description"
        id="service_description"
        value={value.service_description}
        variant="textarea"
        onChange={onChange}
      />
      <Label
        htmlFor="frequency"
        info="How regularly you will need our services"
      >
        Frequency
      </Label>
      <Select
        name="frequency"
        id="frequency"
        value={value.frequency}
        onChange={onChange}
        options={["Daily", "Weekly", "Monthly", "Custom"].map((opt) => ({
          label: opt,
          value: opt,
        }))}
      />
      <Label htmlFor="comments">Extra Comments</Label>
      <Input
        id="comments"
        name="comments"
        onChange={onChange}
        value={value.comments}
        variant="textarea"
        placeholder={
          value.frequency === "Custom" ? "Type the custom frequency here" : ""
        }
      />
    </>
  );
}
