import {
  Form,
  useNavigation,
  useSearchParams,
  isRouteErrorResponse,
} from "react-router";
import { MdOutlineError, MdCheck } from "react-icons/md";
import { TbWorldShare } from "react-icons/tb";
import type { Route } from "./+types/track";
import Input from "@shared/Input";
import Button from "@shared/Button";
import { fetchOrderByTrackingId } from "@services/grist.services";
import { orderSteps } from "@data/tracking.data";

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const trackingId = searchParams.get("id");
  if (!trackingId) return null;
  const record = await fetchOrderByTrackingId(trackingId);
  return record;
}

export default function Track({ loaderData }: Route.ComponentProps) {
  const { state } = useNavigation();
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get("id");
  const results = loaderData && !("error" in loaderData) ? loaderData : null;
  let activeIndex = Object.keys(orderSteps).findIndex(
    (status) => status === results?.Order_Status,
  );

  return (
    <section aria-label="Track Package">
      <div className="container">
        <span className="headline">Getting Started</span>
        <h2>Track your AguXpress Order</h2>
        <Form method="get">
          <span className="flex gap-5 pt-5">
            <Input
              type="search"
              name="id"
              placeholder="Tracking ID"
              defaultValue={trackingId || ""}
              className="m-0"
            />
            <Button disabled={state === "loading"}>Track</Button>
          </span>
          {loaderData && (
            <div className="bg-ax-white-d input-shadow my-10 rounded-xs p-5 [&>div>span]:inline [&>div>span]:font-medium">
              {results ? (
                <>
                  {results.overseas && (
                    <div className="mb-2">
                      <TbWorldShare className="text-ax-black-d/60 inline text-xl" />{" "}
                      International Delivery
                    </div>
                  )}
                  <div>
                    Sender: <span>{results.dev_sender}</span>
                  </div>
                  <div>
                    Service Type:{" "}
                    <span>{results.Service_Type.slice(1).join(", ")}</span>
                  </div>
                  {results.del_name && (
                    <>
                      <div className="mt-2">
                        Delivery Handler: <span>{results.del_name}</span>
                      </div>
                      <div>
                        Handler's Contact: <span>{results.del_phone}</span>
                      </div>
                    </>
                  )}
                  <span className="mt-2 mb-8 text-xs">
                    Tracking ID: {results.Tracking_ID}
                  </span>

                  <div>
                    {Object.entries(orderSteps)
                      .slice(0, 3)
                      .map(([statusKey, statusDescription], index) => {
                        const isActive = index === activeIndex;
                        const isReachedStep = index <= activeIndex;

                        return (
                          <div
                            key={statusKey}
                            className={`relative pb-6 after:absolute after:top-8 after:bottom-0 after:left-2.25 after:block not-last-of-type:after:border-l-2 ${isReachedStep ? "after:border-ax-red-a/30" : "after:border-gray-200"}`}
                          >
                            <header className="flex min-h-8 items-center">
                              <span
                                className={`mr-5 flex size-5 items-center justify-center rounded-full ${isActive || isReachedStep ? "bg-ax-red-a/50" : "bg-gray-200"}`}
                              >
                                {isActive || isReachedStep ? (
                                  <MdCheck className="text-2xl text-white" />
                                ) : (
                                  <span className="text-xs/0 text-gray-400">
                                    {index + 1}
                                  </span>
                                )}
                              </span>
                              <span
                                className={`rounded-sm px-4 py-0.5 ${isActive || isReachedStep ? "bg-ax-red-a/60 text-white" : "bg-gray-200 text-gray-500"}`}
                              >
                                {statusKey}
                              </span>
                            </header>
                            {isActive && (
                              <span className="ml-10 py-2 text-sm">
                                {statusDescription}
                              </span>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </>
              ) : (
                <>
                  <MdOutlineError className="text-ax-red-d/50 mr-3 inline text-3xl" />{" "}
                  Tracking ID Not Found
                </>
              )}
            </div>
          )}
        </Form>
      </div>
    </section>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
