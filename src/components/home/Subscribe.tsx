import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";

const Subscribe = () => (
  <section className="not-md:p-0 md:pb-0" aria-label="newsletter">
    <div className="bg-ax-yellow-a px-4 py-9">
      <div className="mx-auto max-w-2xl lg:grid lg:grid-cols-2">
        <h2 className="text-start lg:text-4xl">
          Subscribe for Tips, Promos and Service Updates
        </h2>

        <form action="" className="">
          <Input
            type="email"
            name="email_address"
            placeholder="Enter Your Email"
            aria-label="email"
            className="bg-ax-white-a mt-0 mb-2.5 h-16 px-4 text-sm shadow-none"
          />

          <Button type="submit">Subscribe Now</Button>
        </form>
      </div>
    </div>
  </section>
);

export default Subscribe;
