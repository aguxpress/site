import * as z from "zod/mini";
import Label from "@shared/Label";
import Input from "@shared/Input";

export const BusinessInfoSchema = z.object({
  business_name: z.string().check(z.minLength(2)),
  business_description: z.string().check(z.minLength(2)),
});

export default function BusinessInfo({
  value,
  onChange,
}: {
  value: z.infer<typeof BusinessInfoSchema>;
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
