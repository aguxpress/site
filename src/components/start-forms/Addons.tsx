import { FaAngleDown } from "react-icons/fa";
import Label from "@shared/Label";
import Input from "@shared/Input";
import { cn } from "@utils/tailwind.utils";

export interface AddonsOpts {
  pickup: boolean;
  pickup_address: string;
  insurance: boolean;
  insurance_value: number | string;
  city: string;
}

interface ToggleProps {
  children: React.ReactNode;
  name: string;
  info?: string;
  id: string;
  isOpen: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  readOnly?: boolean;
}

export const Toggle = ({
  children,
  name,
  info,
  id,
  isOpen,
  setOpen,
  onChange,
  readOnly = false,
}: ToggleProps) => {
  return (
    <div className="mb-5 bg-gray-300 shadow-sm">
      <span
        className="flex cursor-pointer justify-between rounded-md p-4"
        onClick={() => {
          onChange
            ? onChange({
                currentTarget: { name: id, type: "checkbox", checked: !isOpen },
              } as React.ChangeEvent<HTMLInputElement>)
            : setOpen?.(!isOpen);
        }}
      >
        <span className="flex gap-2">
          <input
            type="checkbox"
            id={id}
            name={id}
            checked={isOpen}
            className="accent-ax-red-d w-6 cursor-pointer"
            {...(readOnly
              ? { readOnly }
              : { onChange: onChange ?? (() => setOpen?.(!isOpen)) })}
          />
          <span className="inline" onClick={(event) => event.stopPropagation()}>
            <Label info={info} htmlFor={id}>
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
  value,
  onChange,
}: {
  value: AddonsOpts;
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
}) {
  return (
    <>
      <Toggle
        name="Pickup"
        info="Would you like AguXpress to come pick up the package?"
        id="pickup"
        isOpen={value.pickup}
        onChange={onChange}
      >
        <Label
          htmlFor="pickup_address"
          info={`Make sure this address is in ${value.city}`}
        >
          Pickup Address
        </Label>
        <Input
          id="pickup_address"
          name="pickup_address"
          variant="textarea"
          value={value.pickup_address}
          onChange={onChange}
        />
      </Toggle>
      <Toggle
        name="Insurance (Recommended)"
        id="insurance"
        isOpen={value.insurance}
        onChange={onChange}
      >
        <Label
          htmlFor="insurance_value"
          info={`Please declare the actual value of your package as Insurance payouts are based on the declared value. Value should be in Naira (NGN).`}
        >
          Package Value
        </Label>
        <Input
          id="insurance_value"
          name="insurance_value"
          type="number"
          value={value.insurance_value}
          onChange={onChange}
        />
      </Toggle>
    </>
  );
}
