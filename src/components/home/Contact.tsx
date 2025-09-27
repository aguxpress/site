import { useState } from "react";
import { useFetcher } from "react-router";
import toast from "react-hot-toast";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";

function Contact() {
  const fetcher = useFetcher();
  const [fk, setFk] = useState(0);

  // const [formValues, setFormValues] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   message: "",
  // });

  // const handleChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = event.target;
  //   setFormValues((prev) => ({ ...prev, [name]: value }));
  // };

  return (
    <section aria-label="contact" id="contact">
      <div className="container">
        <p className="headline">Contact Us</p>

        <h2>Let's Get Things Moving</h2>

        <form
          method="post"
          className="mx-auto max-w-2xl"
          key={fk}
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await fetcher.submit(event.currentTarget);
              toast.success("Message sent successfully");
              setFk((fk) => ++fk);
            } catch (err) {
              toast.error("Something went wrong, try again");
            }
          }}
        >
          <label htmlFor="name" className="contact-label">
            Name
          </label>
          <Input
            name="name"
            id="name"
            type="text"
            // value={formValues.name}
            // onChange={handleChange}
            required
            autoComplete="name"
          />
          <span className="gap-5 md:grid md:grid-cols-2">
            <span>
              <label htmlFor="email" className="contact-label">
                Email
              </label>
              <Input
                name="email"
                type="email"
                id="email"
                // onChange={handleChange}
                // value={formValues.email}
                required
              />
            </span>
            <span>
              <label htmlFor="phone" className="contact-label">
                Phone Number
              </label>
              <Input
                name="phone"
                type="tel"
                id="phone"
                // onChange={handleChange}
                // value={formValues.phone}
                required
              />
            </span>
          </span>
          <label htmlFor="message" className="contact-label">
            Message
          </label>
          <Input
            variant="textarea"
            name="message"
            id="message"
            placeholder="Write us a message ..."
            // onChange={handleChange}
            // value={formValues.message}
            rows={4}
            required
          />
          <Button
            type="submit"
            disabled={fetcher.state !== "idle"}
            className="disabled:bg-gray-500"
          >
            {fetcher.state === "idle" ? "Submit" : "Submitting ..."}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
