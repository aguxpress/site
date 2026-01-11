import { Link } from "react-router";
import { IoChevronForward } from "react-icons/io5";
import primaryLogo from "@logos/primary.png";
import truck from "@images/truck-banner.jpg";
import redSquare from "@images/red-square.jpg";

const About = () => (
  <section id="about" aria-label="about">
    <div className="container lg:grid lg:grid-cols-2">
      <figure
        className="relative mb-15 aspect-400/720 max-w-75 shadow-[0px_40px_60px_hsla(202,75%,47%,0.7)]"
        // style={{--width: 400 --height: 720}}
      >
        <img
          src={truck}
          width={400}
          height={720}
          loading="lazy"
          alt=""
          className="h-full w-full object-cover"
        />

        <img
          src={primaryLogo}
          width={260}
          height={170}
          loading="lazy"
          alt=""
          className="drop-shadow-ax-black-d animate-float absolute right-0 bottom-10 drop-shadow-sm sm:-right-50 lg:-right-25"
        />

        <img
          src={redSquare}
          loading="lazy"
          alt=""
          className="absolute bottom-0 left-12.5 -z-1 hidden w-100 sm:block"
        />
      </figure>

      <div>
        <span className="text-base leading-loose font-bold text-gray-800">
          Driven by Purpose. Focused on You.
        </span>

        <h2 className="mb-5 text-start text-3xl">
          Your Trusted Partner in Everyday Delivery
        </h2>

        <ul className="mb-10">
          <li className="mb-3 flex gap-4">
            <div className="about-icon">
              <IoChevronForward />
            </div>

            <p className="text-[15px]">
              We are a forward-thinking logistics company dedicated to
              transforming the industry through innovative technology and
              evidence-based solutions. Our mission is to build trust in
              delivery services by ensuring customer satisfaction through fast,
              safe, and reliable movement of goods.
            </p>
          </li>

          <li className="flex gap-4">
            <div className="about-icon">
              <IoChevronForward />
            </div>

            <p className="text-[15px]">
              We are committed to empowering individuals, fostering growth in
              employment opportunities, and setting new standards of
              professionalism and excellence in logistics. At our core, we
              prioritize transparency, integrity, and a customer-centric
              approach in every aspect of our operations.
            </p>
          </li>
        </ul>

        <Link
          to="/start"
          className="hero-btn bg-ax-red-c hover:bg-ax-red-a text-ax-white-d shadow-ax-black-a/40 border-none shadow-sm drop-shadow-none hover:shadow-md"
        >
          Get Started
        </Link>
      </div>
    </div>
  </section>
);

export default About;
