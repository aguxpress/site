import { cn } from "@utils/tailwind.utils";

export interface ChoiceProps {
  name: string;
  selected: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  options: {
    id: string;
    title: string;
    value: string;
    image: string;
  }[];
}

function Choice({ name, selected, onChange, options }: ChoiceProps) {
  return (
    <div className="my-5 grid max-w-md grid-cols-3 gap-5">
      {options.map(({ id, title, value, image }) => (
        <span key={id} className="">
          <input
            type="radio"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className="hidden"
            checked={selected === value}
          />
          <label
            htmlFor={id}
            style={{ backgroundImage: `url(${image})` }}
            className={cn([
              "outline-ax-red-d after:border-ax-red-d before:from-ax-black-d input-shadow relative flex h-20 items-end overflow-hidden rounded-md bg-cover bg-center bg-no-repeat px-3 py-1 text-white text-shadow-xs before:absolute before:inset-0 before:h-full before:w-full before:bg-linear-0 before:to-transparent before:to-50% after:absolute after:top-1 after:right-1 after:size-4 after:rounded-full",
              selected === value && "outline-4 after:border-4",
            ])}
          >
            <span className="z-1">{title}</span>
          </label>
        </span>
      ))}
    </div>
  );
}

export default Choice;
