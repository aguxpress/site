import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";
import toast from "react-hot-toast";
import Button from "@shared/Button";
import Input from "@shared/Input";
import type { AppLoaderData, ZohoResponse } from "@/types/utils.types";

const Subscribe = () => {
  const [patternAccent, setPatternAccent] = useState("f2c200");
  const [fk, setFk] = useState(0);
  const { Form, state, data } = useFetcher<AppLoaderData<ZohoResponse>>();

  // Turn this into a custom hook
  useEffect(() => {
    if (state === "submitting") toast.loading("Submitting Email");
    if (state !== "idle" || !data) return;
    toast.dismiss();
    if ("error" in data) {
      toast.error(data.error);
    } else {
      toast.success("Email Added Successfully");
      setFk((fk) => ++fk);
    }
  }, [data, state]);

  useEffect(() => {
    let styles = getComputedStyle(document.documentElement);
    setPatternAccent(styles.getPropertyValue("--color-ax-yellow-a").slice(1));
  }, []);

  const svgPattern = useMemo(
    () =>
      `url("data:image/svg+xml,%3Csvg width='84' height='16' viewBox='0 0 84 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M78 7V4h-2v3h-3v2h3v3h2V9h3V7h-3zM30 7V4h-2v3h-3v2h3v3h2V9h3V7h-3zM10 0h2v16h-2V0zm6 0h4v16h-4V0zM2 0h4v16H2V0zm50 0h2v16h-2V0zM38 0h2v16h-2V0zm28 0h2v16h-2V0zm-8 0h6v16h-6V0zM42 0h6v16h-6V0z' fill='%23${patternAccent}' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    [patternAccent],
  );

  return (
    <section className="not-md:p-0 md:pb-0" aria-label="newsletter">
      <div
        className="bg-ax-yellow-b px-4 py-9"
        style={{
          backgroundImage: svgPattern,
        }}
      >
        <div className="mx-auto max-w-2xl lg:grid lg:grid-cols-2">
          <h2 className="text-start lg:text-4xl">
            Subscribe for Tips, Promos and Service Updates
          </h2>

          <Form action="/api/mail-list" method="POST" className="" key={fk}>
            <Input
              // type="email"
              name="email_address"
              placeholder="Enter Your Email"
              required
              aria-label="email"
              className="bg-ax-white-a mt-0 mb-2.5 h-16 px-4 text-sm shadow-none"
            />

            <Button type="submit" disabled={state === "submitting"}>
              Subscribe Now
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
