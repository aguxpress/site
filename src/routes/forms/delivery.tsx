import { useState } from "react";
import WizardLayout from "@components/ui/WizardLayout";
import PersonData from "@components/forms/PersonData";
import SinglePackage from "@components/forms/SinglePackage";
import Destination from "@components/forms/Destination";
import Addons from "@components/forms/Addons";

export default function Delivery() {
  const [delivery, setDelivery] = useState({
    fullname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    category: "",
    weight: 0,
    pickup: false,
    pickup_address: "",
    insurance: false,
    recipient_fullname: "",
    recipient_email: "",
    recipient_phone: "",
    destination_city: "",
    delivery_address: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    return setDelivery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(delivery);
  };

  return (
    <section aria-label="delivery" id="delivery">
      <div className="container">
        <p className="headline">Send Request</p>
        <h2>Book a delivery</h2>
        <form method="post" onSubmit={handleSubmit}>
          <WizardLayout
            steps={[
              {
                title: "Personal Details",
                subsection: <PersonData onChange={handleChange} />,
              },
              {
                title: "Package",
                subsection: (
                  <>
                    <SinglePackage onChange={handleChange} />
                    <Addons onChange={handleChange} />
                  </>
                ),
              },
              {
                title: "Destination",
                subsection: (
                  <>
                    <PersonData type="recipient" onChange={handleChange} />
                    <Destination onChange={handleChange} />
                  </>
                ),
              },
            ]}
          />
        </form>
      </div>
    </section>
  );
}
