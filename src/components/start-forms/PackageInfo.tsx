import * as z from "zod/mini";
import Label from "@shared/Label";
import Select from "@shared/Select";
import Input from "@shared/Input";
import Choice, { type ChoiceProps } from "@shared/Choice";
import openTruck from "@images/open-medium-truck.jpg";
import closedTruck from "@images/closed-medium-truck.jpg";

export const SinglePackageSchema = z.object({
  category: z.string(),
  weight: z.number(),
  size: z.optional(z.enum(["Parcel", "Haulage"])),
  truck_type: z.enum(["Open", "Closed"]),
});

const categories = [
  "Documents",
  "Electronic Gadgets",
  "Clothing and Fashion Items",
  "Furniture",
  "Food and Perishables",
  "Glass or other Fragile Items",
  "Artwork and Antiques",
  "Cosmetics and Beauty Care",
  "Chemicals (paint etc)",
  "Others",
];

const trucks: ChoiceProps["options"] = [
  { id: "Open", image: openTruck, title: "Open Truck", value: "Open" },
  { id: "Closed", image: closedTruck, title: "Closed Truck", value: "Closed" },
];

export default function SinglePackage({
  value,
  onChange,
}: {
  value: z.infer<typeof SinglePackageSchema>;
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void;
}) {
  // Here so that it can be typechecked
  const sizes: NonNullable<typeof value.size>[] = ["Parcel", "Haulage"];

  return (
    <>
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label
            htmlFor="category"
            info="AguXpress is not liable for any damage to very fragile items like glass. If shipping this, we recommend the additional insurance option below."
          >
            Package Category
          </Label>
          <Select
            name="category"
            id="category"
            value={value.category}
            onChange={onChange}
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
          />
        </span>
        <span>
          <Label info="Haulage means bulk delivery">Package Size</Label>
          <Select
            name="size"
            onChange={onChange}
            value={value.size}
            options={sizes.map((value) => ({ value, label: value }))}
          />
        </span>
      </div>
      {value.size === "Parcel" ? (
        <>
          <Label
            info="We will use estimated weight for pricing"
            htmlFor="weight"
          >
            Estimated Weight (in KG)
          </Label>
          <Input
            type="number"
            placeholder="0"
            min={0}
            id="weight"
            name="weight"
            value={value.weight}
            onChange={onChange}
          />
        </>
      ) : (
        <>
          <Label htmlFor="truck_type">Request Truck Type</Label>
          <Choice
            name="truck_type"
            selected={value.truck_type}
            onChange={onChange}
            options={trucks}
          />
        </>
      )}
    </>
  );
}
