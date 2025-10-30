import Label from "@components/ui/Label";
import Input from "@components/ui/Input";

export interface DestinationOpts {
  city: string;
  state: string;
  destination_state: string;
  destination_city: string;
  street_address: string;
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
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label
            htmlFor="destination_state"
            info="AguXpress can only deliver to other states if pickup is from Awka"
          >
            Destination State
          </Label>
          <Input
            id="destination_state"
            name="destination_state"
            // Validation needed here to ensure instruction
            value={value.destination_state}
            onChange={onChange}
            // placeholder={
            //   value.city === "Awka"
            //     ? "Anywhere in Nigeria"
            //     : `Anywhere in ${value.state} State`
            // }
          />
        </span>

        <span>
          <Label htmlFor="destination_city">Destination City</Label>
          <Input
            name="destination_city"
            id="destination_city"
            value={value.destination_city}
            onChange={onChange}
          />
        </span>
      </div>

      <Label htmlFor="street_address">Street Address</Label>
      <Input
        variant="textarea"
        id="street_address"
        name="street_address"
        value={value.street_address}
        onChange={onChange}
      />

      {/* <Label>Destination ZIP Code</Label>
      <Input type="number" />
      <Label>Destination Address</Label>
      <Input variant="textarea" /> */}
    </>
  );
}
