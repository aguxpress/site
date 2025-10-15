import { useState } from "react";
import { useNavigate } from "react-router";
import { cn } from "@utils/display.utils";
import Button from "./Button";

interface WizardProps {
  steps: {
    title: string;
    subsection: React.ReactNode;
  }[];
}

export default function Wizard({ steps }: WizardProps) {
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();

  const finalStep: WizardProps["steps"][number] = {
    title: "Finish",
    subsection: <></>,
  };

  const displaySteps = [...steps, finalStep];

  return (
    <div className="pt-8">
      <div className="relative mb-18">
        <progress
          max={displaySteps.length - 1}
          value={phase}
          className="mx-auto block h-1 w-4/5 bg-gray-200 [&::-moz-progress-bar]:bg-gray-400 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-gray-400"
        />
        <div className="absolute top-1/2 left-1/2 flex w-[calc(80%+(--spacing(8)))] -translate-x-1/2 -translate-y-1/2 justify-between">
          {displaySteps.map((step, index) => (
            <div className="relative" key={step.title}>
              <span
                className={cn([
                  `flex size-6 items-center justify-center rounded-full shadow-sm`,
                  phase < index ? "bg-white" : "bg-ax-yellow-a text-white",
                ])}
              >
                <span className="text-xs">{index + 1}</span>
              </span>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[0.6rem] text-nowrap sm:text-xs">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      {displaySteps[phase].subsection}
      <div className="mx-auto mt-10 flex w-4/5 justify-between">
        <Button
          type="button"
          onClick={() => {
            navigate("#");
            setPhase((value) => Math.max(0, value - 1));
          }}
          className={cn([phase === 0 && "invisible"])}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => {
            navigate("#");
            setPhase((value) => Math.min(displaySteps.length - 1, value + 1));
          }}
          className={cn([phase === displaySteps.length - 1 && "invisible"])}
        >
          {phase === displaySteps.length - 2 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}
