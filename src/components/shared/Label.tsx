import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@utils/tailwind.utils";
import { FaCircleInfo } from "react-icons/fa6";
import * as Popover from "@radix-ui/react-popover";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  info?: string;
}

const Label = ({ className, info, children, ...otherProps }: LabelProps) => {
  return (
    <span className="flex items-baseline">
      <label
        className={cn(
          "font-oswald text-2xl leading-[1.2] font-semibold capitalize",
          className,
        )}
        {...otherProps}
      >
        {children}
      </label>
      {info && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <FaCircleInfo className="ml-2 inline-block cursor-pointer text-base text-gray-500" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side="right"
              className="bg-ax-white-d max-w-xs scale-95 rounded-md p-4 text-sm opacity-0 shadow-md duration-1000 outline-none data-[state=open]:scale-100 data-[state=open]:opacity-100"
            >
              {info}
              <Popover.Arrow className="fill-ax-white-d" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </span>
  );
};

export default Label;
