import { Link } from "react-router";
import bannerBlur from "@images/banner-blur.png";

const Hero = () => (
  <section
    className="relative z-1 -mt-[--spacing(var(--header-gap))] grid min-h-screen place-content-center bg-cover bg-center bg-no-repeat pt-[calc(--spacing(var(--header-gap))+--spacing(5))] pb-10 text-white"
    aria-label="home"
    id="home"
    style={{ backgroundImage: `url(${bannerBlur})` }}
  >
    <div className="px-4">
      <div className="bg-ax-black-a/60 p-7.5 text-center">
        <h2 className="text-4xl leading-tight text-white uppercase">
          <span className="text-ax-yellow-a block text-[3rem] font-bold">
            Logistics Made Easy
          </span>
          Safe and Affordable
        </h2>

        <p className="text-ax-white-a my-4">
          AguXpress delivers more than just packages — we deliver peace of mind.
          Whether you need fast dispatch, safe pickup, reliable haulage, secure
          escrow, or insurance for your goods in transit, we're here to help you
          move smarter and worry less - anywhere in Nigeria.
        </p>

        <Link to="#services" className="hero-btn">
          View Services
        </Link>
        <br />
        <a href="tel:+2347087673400" className="hero-btn">
          Call Us
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
