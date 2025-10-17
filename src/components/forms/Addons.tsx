import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Label from "@components/ui/Label";
import Select from "@components/ui/Select";
import Input from "@components/ui/Input";
import { cn } from "@utils/display.utils";

const Toggle = ({
  children,
  name,
  info,
  id,
}: {
  children: React.ReactNode;
  name: string;
  info?: string;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-5 bg-gray-300 shadow-sm">
      <span
        className="flex cursor-pointer justify-between rounded-md p-4"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="flex gap-2">
          <input
            type="checkbox"
            id={id}
            checked={isOpen}
            className="w-6 cursor-pointer"
            onChange={(event) => setIsOpen(event.target.checked)}
          />
          <span className="inline" onClick={(event) => event.stopPropagation()}>
            <Label info={info} htmlFor={id} className="cursor-pointer">
              {name}
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
          isOpen ? "block" : "hidden",
        ])}
      >
        {children}
      </div>
    </div>
  );
};

export default function Addons({
  onChange,
}: {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}) {
  const [isPickup, setIsPickup] = useState(false);

  return (
    <>
      <Toggle
        name="Pickup"
        info="Would you like AguXpress to come pick up the package?"
        id="pickup"
      >
        <Label>Pickup Address</Label>
        <Input variant="textarea" />
      </Toggle>
      <Toggle name="Insurance" info="Recommended" id="insurance">
        Thank you for insuring your package
      </Toggle>
    </>
  );
}
