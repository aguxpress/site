import { TfiPackage } from "react-icons/tfi";
import { FiTruck } from "react-icons/fi";
import { RiShoppingBagLine } from "react-icons/ri";
import WizardLayout from "@components/ui/WizardLayout";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Label from "@components/ui/Label";
import Choices from "@components/ui/Choices";
import PersonData from "@components/forms/PersonData";
import SinglePackage from "@components/forms/SinglePackage";
import Destination from "@components/forms/Destination";
import Pickup from "@components/forms/Pickup";

export default function Delivery() {
  return (
    <section aria-label="delivery" id="delivery">
      <div className="container">
        <p className="headline">Send Request</p>
        <h2>Book a delivery</h2>
        <form method="post">
          <WizardLayout
            steps={[
              { title: "Personal Details", subsection: <PersonData /> },
              {
                title: "Package",
                subsection: (
                  <>
                    <SinglePackage />
                    <Pickup />
                  </>
                ),
              },
              {
                title: "Destination",
                subsection: <Destination />,
              },
              {
                title: "Recipient",
                subsection: <PersonData type="recipient" />,
              },
            ]}
          >
            {/*

            <Label>Recipient Full Name</Label>
            <Input />
            <div className="gap-5 md:grid md:grid-cols-2">
              <span>
                <Label>Recipient Email</Label>
                <Input />
              </span>
              <span>
                <Label>Recipient Phone Number</Label>
                <Input />
              </span>
            </div> */}
          </WizardLayout>
        </form>
      </div>
    </section>
  );
}
