import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";

const Subscribe = () => (
  <section className="bg-ax-yellow-a" aria-label="newsletter">
    <div className="container">
      <h2 className="text-start">
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
  </section>
);

export default Subscribe;
