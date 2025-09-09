import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@utils/display.utils";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

const Button = ({ className, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={cn(
        "btn font-oswald px-5 py-2 text-2xl font-bold lg:px-7.5 lg:py-2.5",
        className,
      )}
      {...otherProps}
    />
  );
};

export default Button;
