import { useState } from "react";
import Label from "@components/ui/Label";
import { Toggle } from "./Addons";
import Input from "@components/ui/Input";
import Choice from "@components/ui/Choice";
import openSmall from "@images/open-small-truck.jpg";
import closedSmall from "@images/closed-small-truck.jpg";
import openMedium from "@images/open-medium-truck.jpg";
import closedMedium from "@images/closed-medium-truck.jpg";
import openLarge from "@images/open-large-truck.jpg";
import closedLarge from "@images/closed-large-truck.jpg";
// Budget
// Comments

export interface MovingInstructionsOpts {
  insurance: boolean;
  covered_items: string;
  labourers: boolean;
  truck_size: "Small" | "Medium" | "Large";
  truck_type: "Open" | "Closed";
  budget?: number;
  comments: string;
}

const truckImages = {
  Small: [openSmall, closedSmall],
  Medium: [openMedium, closedMedium],
  Large: [openLarge, closedLarge],
};

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
      {/* Use pictures to show types of trucks */}
      <Label htmlFor="truck_size">Size of Truck</Label>
      {/* <Select
        id="truck_size"
        name="truck_size"
        value={value.truck_size}
        onChange={onChange}
        options={["Small", "Medium", "Large"].map((value) => ({
          label: value,
          value,
        }))}
      /> */}
      <Choice
        name="truck_size"
        onChange={onChange}
        selected={value.truck_size}
        options={[
          {
            id: "small",
            image: openSmall,
            title: "Small",
            value: "Small",
          },
          {
            id: "medium",
            image: openMedium,
            title: "Medium",
            value: "Medium",
          },
          {
            id: "large",
            image: openLarge,
            title: "Large",
            value: "Large",
          },
        ]}
      />
      <Label htmlFor="truck_type">Type of Truck</Label>
      {/* <Select
        id="truck_type"
        name="truck_type"
        value={value.truck_type}
        onChange={onChange}
        options={["Open", "Closed"].map((value) => ({
          label: value,
          value,
          }))}
          /> */}
      <Choice
        name="truck_type"
        onChange={onChange}
        selected={value.truck_type}
        options={[
          {
            id: "open",
            image: truckImages[value.truck_size][0],
            title: "Open",
            value: "Open",
          },
          {
            id: "closed",
            image: truckImages[value.truck_size][1],
            title: "Closed",
            value: "Closed",
          },
        ]}
      />
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
