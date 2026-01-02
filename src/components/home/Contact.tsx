import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import toast from "react-hot-toast";
import ReCaptcha, { getReCaptchaToken } from "@components/home/ReCaptcha";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Label from "@components/ui/Label";

function Contact() {
  const fetcher = useFetcher<{ success: boolean; message: string }>();
  const [fk, setFk] = useState(0);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        toast.success("Message sent successfully");
        setFk((fk) => ++fk);
      } else if (!fetcher.data.success) {
        toast.error("Something went wrong, try again");
      }
    }
  }, [fetcher.data, fetcher.state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = await getReCaptchaToken();
      const formData = new FormData(event.target as HTMLFormElement);
      formData.append("recaptcha_token", token ?? "");
      await fetcher.submit(formData, { method: "POST" });
    } catch (err) {
      toast.error("Something went wrong, try again");
    }
  };

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

        <fetcher.Form
          method="post"
          className="mx-auto max-w-2xl"
          key={fk}
          onSubmit={handleSubmit}
        >
          <Label htmlFor="name">Name</Label>
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
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="phone">Phone Number</Label>
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
          <Label htmlFor="message">Message</Label>
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
          <div className="flex justify-between sm:justify-start sm:gap-10">
            <Button type="submit" disabled={fetcher.state !== "idle"}>
              {fetcher.state === "idle" ? "Submit" : "Submitting ..."}
            </Button>
            <ReCaptcha />
          </div>
        </fetcher.Form>
      </div>
    </section>
  );
}

export default Contact;
