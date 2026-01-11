import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@utils/tailwind.utils";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

const Button = ({ className, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={cn(
        "btn font-oswald cursor-pointer px-5 py-2 text-2xl font-bold shadow-[0px_2px_2px_hsla(0,0%,0%,0.1)] transition-shadow hover:shadow-[0px_2px_7px_hsla(0,0%,0%,0.3)] disabled:bg-gray-500 lg:px-7.5 lg:py-2.5",
        className,
      )}
      {...otherProps}
    />
  );
};

export default Button;
