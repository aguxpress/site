import Wizard from "@components/ui/Wizard";

type BusinessData = 

export default function Business() {
  const [businessInfo, setBusinessInfo] = useState<>({})

  return (
    <section aria-label="business" id="business">
      <div className="container">
        <p className="headline">Send Request</p>
        <h2>Business Partnership</h2>
        <Wizard />
      </div>
    </section>
  );
}
