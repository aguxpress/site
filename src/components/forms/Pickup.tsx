import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Label from "@components/ui/Label";
import Select from "@components/ui/Select";
import Input from "@components/ui/Input";
import { cn } from "@utils/display.utils";

export default function Pickup() {
  const [isPickup, setIsPickup] = useState(false);

  return (
    <div className="bg-gray-300 shadow-sm">
      <span
        className="flex cursor-pointer justify-between rounded-md p-4"
        onClick={() => setIsPickup((value) => !value)}
      >
        <span className="flex gap-2">
          <input
            type="checkbox"
            id="pickup"
            checked={isPickup}
            className="w-6 cursor-pointer"
            onChange={(event) => setIsPickup(event.target.checked)}
          />
          <span className="inline" onClick={(event) => event.stopPropagation()}>
            <Label
              info="Would you like AguXpress to come pick up the package?"
              htmlFor="pickup"
              className="cursor-pointer"
            >
              Pickup
            </Label>
          </span>
        </span>
        <span>
          <FaAngleDown className="text-2xl" />
        </span>
      </span>
      <div
        className={cn([
          "border-l-10 border-gray-300 bg-gray-100 p-4",
          isPickup ? "block" : "hidden",
        ])}
      >
        <div className="gap-5 md:grid md:grid-cols-2">
          <span>
            <Label>Country</Label>
            <Select options={[]} />
          </span>
          <span>
            <Label>City</Label>
            {/* If Nigeria display Options */}
            <Select options={[]} />
          </span>
        </div>
        <Label>ZIP Code</Label>
        <Input type="number" />
        <Label>Pickup Address</Label>
        <Input variant="textarea" />
      </div>
    </div>
  );
}
