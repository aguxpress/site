import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@utils/display.utils";

type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "children"> & {
  options: { label: string; value: string }[];
};

function Select({ className, options, ...props }: SelectProps) {
  const classes = cn(
    "bg-white shadow-[0px_2px_2px_hsla(0,0%,0%,0.1)] my-5 px-5 py-2.5 block outline-none w-full",
    className,
  );

  return (
    <select className={classes} {...props}>
      {options.map(({ label, value }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Select;
