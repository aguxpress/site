import Label from "@components/ui/Label";
import Input from "@components/ui/Input";

export interface DestinationOpts {
  city: string;
  state: string;
  destination_state: string;
  destination_city: string;
  street_address: string;
  size?: "Haulage" | "Parcel";
}

export default function Destination({
  onChange,
  value: {
    city,
    destination_city,
    destination_state,
    size,
    state,
    street_address,
  },
}: {
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
  value: DestinationOpts;
}) {
  const isHaulage = size === "Haulage";

  return (
    <>
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label
            htmlFor="destination_state"
            info="Interstate deliveries only apply to Haulage"
          >
            Destination State
          </Label>
          <Input
            id="destination_state"
            name="destination_state"
            disabled={!!size && !isHaulage}
            value={isHaulage || !size ? destination_state : state}
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
            value={destination_city}
            onChange={onChange}
          />
        </span>
      </div>

      <Label htmlFor="street_address">Street Address</Label>
      <Input
        variant="textarea"
        id="street_address"
        name="street_address"
        value={street_address}
        onChange={onChange}
      />

      {/* <Label>Destination ZIP Code</Label>
      <Input type="number" />
      <Label>Destination Address</Label>
      <Input variant="textarea" /> */}
    </>
  );
}
