import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@utils/display.utils";

type InputProps =
  | ({ variant: "textarea" } & ComponentPropsWithoutRef<"textarea">)
  | ({ variant?: "input" } & ComponentPropsWithoutRef<"input">);

function Input({ className, ...props }: InputProps) {
  const classes = cn(
    "bg-white shadow-[0px_2px_2px_hsla(0,0%,0%,0.1)] my-5 px-5 py-3 block outline-none w-full",
    className,
  );

  if (props.variant === "textarea") {
    return <textarea className={classes} {...props} />;
  }
  return <input className={classes} {...props} />;
}

export default Input;
