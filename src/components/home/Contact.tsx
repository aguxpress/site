import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import toast from "react-hot-toast";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import ReCaptcha, { getReCaptchaToken } from "@components/home/ReCaptcha";
import Button from "@shared/Button";
import Input from "@shared/Input";
import Label from "@shared/Label";

function Contact() {
  const fetcher = useFetcher<SMTPTransport.SentMessageInfo>();
  const [fk, setFk] = useState(0);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.accepted.length) {
        toast.success("Message sent successfully");
        setFk((fk) => ++fk);
      } else if (fetcher.data.rejected.length) {
        toast.error("Something went wrong, try again");
      }
    }
  }, [fetcher.data, fetcher.state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const token = await getReCaptchaToken();
    formData.append("recaptcha_token", token ?? "");
    fetcher.submit(formData, { method: "POST" });
  };

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
            required
            autoComplete="name"
          />
          <span className="gap-5 md:grid md:grid-cols-2">
            <span>
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" id="email" required />
            </span>
            <span>
              <Label htmlFor="phone">Phone Number</Label>
              <Input name="phone" type="tel" id="phone" required />
            </span>
          </span>
          <Label htmlFor="message">Message</Label>
          <Input
            variant="textarea"
            name="message"
            id="message"
            placeholder="Write us a message ..."
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
