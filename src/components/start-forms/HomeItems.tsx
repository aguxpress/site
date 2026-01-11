import Label from "@shared/Label";
import Input from "@shared/Input";

export interface HomeItemsOpts {
  beds: number;
  sofas: number;
  tables: number;
  fridges: number;
  washing_machines: number;
  big_drums: number;
  large_items: string;
}

export default function HomeItems({
  value,
  onChange,
}: {
  value: HomeItemsOpts;
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
}) {
  return (
    <>
      <h3 className="font-rubik mb-5 text-center text-base font-medium">
        How many of these items do you have?
      </h3>
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label htmlFor="beds">Beds</Label>
          <Input
            type="number"
            name="beds"
            id="beds"
            value={value.beds}
            onChange={onChange}
            min={0}
          />
        </span>
        <span>
          <Label htmlFor="sofas">Sofas</Label>
          <Input
            type="number"
            min={0}
            name="sofas"
            id="sofas"
            value={value.sofas}
            onChange={onChange}
          />
        </span>
        <span>
          <Label htmlFor="tables">Tables</Label>
          <Input
            type="number"
            min={0}
            name="tables"
            id="tables"
            value={value.tables}
            onChange={onChange}
          />
        </span>
        <span>
          <Label htmlFor="fridges">Fridges</Label>
          <Input
            type="number"
            min={0}
            name="fridges"
            id="fridges"
            value={value.fridges}
            onChange={onChange}
          />
        </span>
        <span>
          <Label htmlFor="washing_machines">Washing Machines</Label>
          <Input
            type="number"
            min={0}
            name="washing_machines"
            id="washing_machines"
            value={value.washing_machines}
            onChange={onChange}
          />
        </span>
        <span>
          <Label htmlFor="big_drums">Tanks/Big Drums</Label>
          <Input
            type="number"
            min={0}
            name="big_drums"
            id="big_drums"
            value={value.big_drums}
            onChange={onChange}
          />
        </span>
      </div>

      <Label htmlFor="large_items">Other Large Items</Label>
      <Input
        id="large_items"
        name="large_items"
        value={value.large_items}
        onChange={onChange}
        variant="textarea"
      />
    </>
  );
}
