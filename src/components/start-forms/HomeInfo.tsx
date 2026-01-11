import Label from "@shared/Label";
// import { Toggle } from "./Addons";
import Input from "@shared/Input";
import Select from "@shared/Select";

const getNextDay = (date = new Date()) => {
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 2);
  return nextDay.toISOString().split("T")[0];
};

export interface HomeInfoOpts {
  home_size: string;
  home_floor: string;
  relocation_date: string;
  pickup_address: string;
}

export default function HomeInfo({
  value,
  onChange,
}: {
  value: HomeInfoOpts;
  onChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void;
}) {
  const nextDay = getNextDay();

  return (
    <>
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label htmlFor="home_size">Size of Home</Label>
          <Select
            id="home_size"
            name="home_size"
            value={value.home_size}
            onChange={onChange}
            options={[
              "Self Contained Apartment",
              "One Bedroom Flat",
              "Two Bedroom Flat",
              "Multiple Bedrooms",
              "Office Building",
            ].map((value) => ({ label: value, value }))}
          />
        </span>
        <span>
          <Label htmlFor="home_floor">Home Floor</Label>
          <Select
            name="home_floor"
            id="home_floor"
            value={value.home_floor}
            onChange={onChange}
            options={[
              "Bungalow (Ground Floor)",
              "First Floor",
              "Second Floor",
              "Duplex (Two Floors)",
              "Third Floor",
              "Above Third Floor",
            ].map((value) => ({ label: value, value }))}
          />
        </span>
      </div>

      <Label htmlFor="relocation_date">Date of Relocation</Label>
      <Input
        type="date"
        name="relocation_date"
        id="relocation_date"
        className="uppercase"
        min={nextDay}
        value={value.relocation_date}
        onChange={onChange}
      />
      {/* <Toggle id="pickup" name="pickup" isOpen={true} readOnly> */}
      <Label htmlFor="pickup_address">Pickup Address</Label>
      <Input
        variant="textarea"
        name="pickup_address"
        id="pickup_address"
        value={value.pickup_address}
        onChange={onChange}
      />
      {/* </Toggle> */}
    </>
  );
}
