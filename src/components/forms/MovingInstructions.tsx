import { useState } from "react";
import Label from "@components/ui/Label";
import { Toggle } from "./Addons";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
// Budget
// Comments'
// type of truck (open/covered)
// Size of truck (small/medium/large)

export interface MovingInstructionsOpts {
  insurance: boolean;
  covered_items: string;
  labourers: boolean;
  truck_size: string;
  truck_type: string;
  budget?: number;
  comments: string;
}

export default function MovingInstructions({
  value,
  onChange,
}: {
  value: MovingInstructionsOpts;
  onChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void;
}) {
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  return (
    <>
      <Toggle
        id="insurance"
        name="Insurance"
        isOpen={value.insurance}
        onChange={onChange}
        info="Are there any items you would like to insure?"
      >
        <Label info="In each line, list the items" htmlFor="covered_items">
          List Items to Cover
        </Label>
        <Input
          variant="textarea"
          id="covered_items"
          name="covered_items"
          value={value.covered_items}
          onChange={onChange}
        />
      </Toggle>
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          {/* Use pictures to show types of trucks */}
          <Label htmlFor="truck_size">Size of Truck</Label>
          <Select
            id="truck_size"
            name="truck_size"
            value={value.truck_size}
            onChange={onChange}
            options={["Small", "Medium", "Large"].map((value) => ({
              label: value,
              value,
            }))}
          />
        </span>
        <span>
          <Label htmlFor="truck_type">Type of Truck</Label>
          <Select
            id="truck_type"
            name="truck_type"
            value={value.truck_type}
            onChange={onChange}
            options={["Open", "Closed"].map((value) => ({
              label: value,
              value,
            }))}
          />
        </span>
      </div>
      <Toggle
        id="labourers"
        name="Labourers for Packing"
        isOpen={value.labourers}
        onChange={onChange}
      >
        We will send labourers over to help you pack
      </Toggle>
      <Toggle
        id="budget"
        isOpen={isBudgetOpen}
        name="Do you have a budget?"
        setOpen={setIsBudgetOpen}
      >
        <Label htmlFor="budget">Budget</Label>
        <Input
          type="number"
          id="budget"
          name="budget"
          value={value.budget}
          onChange={onChange}
        />
      </Toggle>
      <Label htmlFor="comments">Comments</Label>
      <Input
        variant="textarea"
        id="comments"
        name="comments"
        value={value.comments}
        onChange={onChange}
      />
    </>
  );
}
