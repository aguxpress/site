import { useEffect, useState } from "react";
import { Link, type Fetcher } from "react-router";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { cn } from "@utils/display.utils";
import Button from "./Button";
// import useShow from "@hooks/useShow";

interface FetcherData {
  error?: string;
}

interface WizardProps<T> {
  formState: T;
  fetcher: Fetcher<FetcherData>;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(formState: T): void;
  steps: (
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    formState: T,
  ) => {
    title: string;
    subsection: React.ReactNode;
  }[];
}

export default function Wizard<T>({
  steps,
  onChange,
  onSubmit,
  formState,
  fetcher,
}: WizardProps<T>) {
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();
  const finalStep: ReturnType<WizardProps<T>["steps"]>[number] = {
    title: "Finish",
    subsection: (
      <div className="bg-ax-white-d rounded-sm py-10 shadow-md">
        <div className="mb-12 flex flex-col items-center">
          <h3 className="text-4xl text-gray-600">Completed.</h3>
          <span className="my-2">We will contact you shortly.</span>
        </div>
        <Link
          to="/start"
          className="hero-btn border-ax-yellow-a hover:text-ax-black-d mx-auto block w-fit text-gray-600 drop-shadow-none"
        >
          Back to Menu
        </Link>
      </div>
    ),
  };

  const isSubmitting = fetcher.state === "submitting";
  const isError = Boolean(fetcher.data?.error);

  const displaySteps = [...steps(onChange, formState), finalStep];
  const isLastFormStep = phase === displaySteps.length - 2;

  console.log(fetcher.data);
  useEffect(() => {
    if (isLastFormStep && !isSubmitting) {
      if (isError) {
        toast.dismiss();
        toast.error("Something went wrong, Try again");
      } else {
        toast.dismiss();
        toast.success("Submitted!");
        setPhase((prev) => prev + 1);
      }
    }
  }, [isError, isSubmitting]);

  return (
    <form>
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
        <div
          className={cn([
            "mx-auto mt-10 flex w-4/5 justify-between",
            displaySteps.length - 1 === phase ? "hidden" : "",
          ])}
        >
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
            disabled={isSubmitting}
            onClick={() => {
              navigate("#");
              if (!isLastFormStep) {
                return setPhase((value) =>
                  Math.min(displaySteps.length - 1, value + 1),
                );
              }
              toast.loading("Submitting Request");
              return onSubmit(formState);
            }}
            className={cn([phase === displaySteps.length - 1 && "invisible"])}
          >
            {isLastFormStep ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </form>
  );
}
