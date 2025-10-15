import Label from "@components/ui/Label";
import Input from "@components/ui/Input";

export default function Destination() {
  return (
    <>
      <Label info="Where is the package headed to?">Destination City</Label>
      <Input />
      <Label>Destination ZIP Code</Label>
      <Input type="number" />
      <Label>Destination Address</Label>
      <Input variant="textarea" />
    </>
  );
}
