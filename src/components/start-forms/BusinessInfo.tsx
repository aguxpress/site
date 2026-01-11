import Label from "@shared/Label";
import Input from "@shared/Input";

export interface BusinessInfoOpts {
  business_name: string;
  business_description: string;
}

export default function BusinessInfo({
  value,
  onChange,
}: {
  value: BusinessInfoOpts;
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
}) {
  return (
    <>
      <Label htmlFor="business_name">Business Name</Label>
      <Input
        id="business_name"
        name="business_name"
        value={value.business_name}
        onChange={onChange}
      />
      <Label htmlFor="business_description" info="What does your business do?">
        Business Description
      </Label>
      <Input
        id="business_description"
        name="business_description"
        value={value.business_description}
        variant="textarea"
        onChange={onChange}
      />
    </>
  );
}
