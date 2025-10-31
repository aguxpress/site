import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@utils/display.utils";

type InputProps =
  | ({ variant: "textarea" } & ComponentPropsWithoutRef<"textarea">)
  | ({ variant?: "input" } & ComponentPropsWithoutRef<"input">);

function Input({ className, value, ...props }: InputProps) {
  const classes = cn(
    "bg-white input-shadow my-5 px-5 py-3 block outline-none w-full resize-none",
    className,
  );

  if (props.variant === "textarea") {
    return <textarea className={classes} {...props} value={value} />;
  }
  return (
    <input
      className={classes}
      {...props}
      value={props.type === "number" ? value || "" : value}
    />
  );
}

export default Input;
