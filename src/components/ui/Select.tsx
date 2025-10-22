import { useEffect } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@utils/display.utils";

type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "children"> & {
  options: { label: string; value: string }[];
};

function Select({
  className,
  options,
  onChange,
  name,
  value,
  ...props
}: SelectProps) {
  const classes = cn(
    "bg-white input-shadow my-5 px-5 py-3 block outline-none w-full appearance-none",
    className,
  );

  useEffect(() => {
    if (!value) {
      onChange?.({
        currentTarget: { name, value: options[0].value },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, []);

  return (
    <select
      className={classes}
      {...props}
      onChange={onChange}
      name={name}
      value={value}
    >
      {options.map(({ label, value }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Select;
