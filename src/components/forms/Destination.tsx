import Label from "@components/ui/Label";
import Input from "@components/ui/Input";

export default function Destination({
  onChange,
}: {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}) {
  return (
    <>
      <Label info="Awka Interstate">Destination City</Label>
      <Input />

      <Label>Delivery Address</Label>
      <Input variant="textarea" />

      {/* <Label>Destination ZIP Code</Label>
      <Input type="number" />
      <Label>Destination Address</Label>
      <Input variant="textarea" /> */}
    </>
  );
}
