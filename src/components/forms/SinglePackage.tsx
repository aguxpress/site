import Label from "@components/ui/Label";
import Select from "@components/ui/Select";
import Input from "@components/ui/Input";

export default function SinglePackage() {
  return (
    <>
      <Label
        htmlFor="package-type"
        info="AguXpress is not liable for any damage to very fragile items like glass. If shipping this, we recommend the additional insurance option below."
      >
        Package Type
      </Label>
      <Select
        name="package-type"
        id="package-type"
        options={[
          { label: "Documents", value: "documents" },
          { label: "Electronic Gadgets", value: "electronic-gadgets" },
          { label: "Clothing and Fashion Items", value: "clothing-fashion" },
          { label: "Furniture", value: "furniture" },
          { label: "Food and Perishables", value: "food-perishables" },
          { label: "Glass or other Fragile Items", value: "fragile" },
          { label: "Artwork and Antiques", value: "artwork-antiques" },
          { label: "Cosmetics and Beauty Care", value: "cosmetics-beauty" },
          { label: "Chemicals (paint etc)", value: "chemicals" },
          { label: "Others", value: "others" },
        ]}
      />
      <Label info="We will use estimated weight for pricing">
        Estimated Weight (in KG)
      </Label>
      <Input type="number" placeholder="0" min={0} />
    </>
  );
}
