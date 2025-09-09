import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";

const Subscribe = () => (
  <section className="pb-0" aria-label="newsletter">
    <div className="bg-ax-yellow-a">
      <div className="mx-auto my-9 max-w-2xl lg:grid lg:grid-cols-2">
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
