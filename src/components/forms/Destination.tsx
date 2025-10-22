import Label from "@components/ui/Label";
import Input from "@components/ui/Input";

export interface DestinationOpts {
  city: string;
  state: string;
  destination_city: string;
  delivery_address: string;
}

export default function Destination({
  onChange,
  value,
}: {
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
  value: DestinationOpts;
}) {
  return (
    <>
      <Label
        htmlFor="destination_city"
        info="AguXpress can only deliver to other states if pickup is from Awka"
      >
        Destination City
      </Label>
      <Input
        id="destination_city"
        name="destination_city"
        value={value.destination_city}
        onChange={onChange}
        placeholder={
          value.city === "Awka"
            ? "Anywhere in Nigeria"
            : `Anywhere in ${value.state} State`
        }
      />

      <Label htmlFor="delivery_address">Delivery Address</Label>
      <Input
        variant="textarea"
        id="delivery_address"
        name="delivery_address"
        value={value.delivery_address}
        onChange={onChange}
      />

      {/* <Label>Destination ZIP Code</Label>
      <Input type="number" />
      <Label>Destination Address</Label>
      <Input variant="textarea" /> */}
    </>
  );
}
