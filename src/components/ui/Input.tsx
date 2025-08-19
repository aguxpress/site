import type { ComponentPropsWithoutRef } from "react";
import { cn } from "src/utils/styling";

type Variants = "input" | "textarea";

type VariantProps<T extends Variants = "input"> = T extends "textarea"
  ? ComponentPropsWithoutRef<"textarea">
  : ComponentPropsWithoutRef<"input">;

function Input<T extends Variants = "input">({
  variant,
  className,
  ...otherProps
}: { variant?: T } & VariantProps<T>) {
  const classes = cn(
    "bg-white shadow-[0px_2px_2px_hsla(0,0%,0%,0.1)] my-5 px-5 py-2.5 block outline-none w-full",
    className,
  );

  return variant === "textarea" ? (
    <textarea
      className={classes}
      {...(otherProps as Omit<VariantProps<"textarea">, "className">)}
    />
  ) : (
    <input
      className={classes}
      {...(otherProps as Omit<VariantProps, "className">)}
    />
  );
}

export default Input;
