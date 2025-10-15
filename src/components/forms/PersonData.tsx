import Label from "@components/ui/Label";
import Input from "@components/ui/Input";

export default function PersonData({ type }: { type?: "user" | "recipient" }) {
  const prefix = type === "recipient" ? "Recipient" : "";
  const idPrefix = prefix ? prefix + "-" : "";

  return (
    <>
      <Label htmlFor={`${idPrefix}fullname`}>{prefix} Full Name</Label>
      <Input
        id={`${idPrefix}fullname`}
        name={`${idPrefix}fullname`}
        type="text"
        required
      />
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label htmlFor={`${idPrefix}email`}>{prefix} Email</Label>
          <Input
            id={`${idPrefix}email`}
            name={`${idPrefix}email`}
            type="email"
            required
          />
        </span>
        <span>
          <Label info="WhatsApp Preferred" htmlFor={`${idPrefix}phone`}>
            {prefix} Phone Number
          </Label>
          <Input
            id={`${idPrefix}phone`}
            name={`${idPrefix}phone`}
            type="tel"
            required
          />
        </span>
      </div>

      {prefix && (
        <>
          <Label>Delivery Address</Label>
          <Input variant="textarea" />
        </>
      )}
    </>
  );
}
