import type { IconType } from "react-icons";

interface ChoicesProps {
  name: string;
  options: {
    id: string;
    title: string;
    value: string;
    icon: IconType;
  }[];
}

{
  /* <Choices
  name="type"
  options={[
    {
      id: "small",
      title: "Small Parcel (< 10kg)",
      value: "small",
      icon: RiShoppingBagLine,
    },
    {
      id: "medium",
      title: "Medium Sized Package",
      value: "medium",
      icon: TfiPackage,
    },
    {
      id: "large",
      title: "Large Package",
      value: "large",
      icon: FiTruck,
    },
    {
      id: "bulk",
      title: "Bulky Package/Haulage",
      value: "bulk",
      icon: FiTruck,
    },
  ]}
          /> */
}

function Choices({ name, options }: ChoicesProps) {
  return (
    <div className="my-5 flex gap-5">
      {options.map(({ id, title, value, icon: IoIcon }) => (
        <span className="input-shadow flex-1 bg-white" key={id}>
          <input type="radio" name={name} id={id} value={value} />
          <IoIcon />
          <label htmlFor="" className="text-sm">
            {title}
          </label>
        </span>
      ))}
    </div>
  );
}

export default Choices;
