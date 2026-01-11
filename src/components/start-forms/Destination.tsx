import Label from "@shared/Label";
import Input from "@shared/Input";

export interface DestinationOpts {
  state: string;
  destination_state: string;
  destination_city: string;
  street_address: string;
  size?: "Haulage" | "Parcel";
}

export default function Destination({
  onChange,
  value: { destination_city, destination_state, size, state, street_address },
}: {
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
  value: DestinationOpts;
}) {
  const isParcel = size === "Parcel";

  return (
    <>
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label
            htmlFor="destination_state"
            {...(isParcel
              ? { info: "Interstate deliveries only apply to haulage" }
              : null)}
          >
            Destination State
          </Label>
          <Input
            id="destination_state"
            name="destination_state"
            disabled={isParcel}
            value={isParcel ? state : destination_state}
            onChange={onChange}
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
    </>
  );
}
