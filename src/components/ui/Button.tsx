import type { ComponentPropsWithoutRef } from "react";
import { cn } from "src/utils/styling";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

const Button = ({ className, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={cn("btn font-oswald px-5 py-2 font-bold", className)}
      {...otherProps}
    />
  );
};

export default Button;
