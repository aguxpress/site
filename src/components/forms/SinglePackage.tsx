import Label from "@components/ui/Label";
import Select from "@components/ui/Select";
import Input from "@components/ui/Input";

export interface SinglePackageOpts {
  category: string;
  weight: number;
}

const categories: string[] = [
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

export default function SinglePackage({
  value,
  onChange,
}: {
  value: SinglePackageOpts;
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void;
}) {
  return (
    <>
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
      <Label info="We will use estimated weight for pricing" htmlFor="weight">
        Estimated Weight (in KG)
      </Label>
      <Input
        type="number"
        placeholder="0"
        min={0}
        id="weight"
        name="weight"
        onChange={onChange}
      />
    </>
  );
}
