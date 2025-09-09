import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";

const Contact = () => (
  <section aria-label="contact" id="contact">
    <div className="container">
      <p className="headline">Contact Us</p>

      <h2>Let's Get Things Moving</h2>

      <form
        action="THIRD PARTY FORM ACTION LINK"
        method="post"
        className="mx-auto max-w-2xl"
      >
        <label htmlFor="name" className="contact-label">
          Name
        </label>
        <Input id="name" type="text" required />
        <label htmlFor="email" className="contact-label">
          Email
        </label>
        <Input type="email" id="email" required />
        <label htmlFor="message" className="contact-label">
          Message
        </label>
        <Input
          variant="textarea"
          name="message"
          id="message"
          rows={4}
          required
        />
        <Button>Submit</Button>
      </form>
    </div>
  </section>
);

export default Contact;
