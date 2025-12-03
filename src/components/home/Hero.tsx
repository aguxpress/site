import { Link } from "react-router";
import bannerBlur from "@images/banner-blur.png";

const Hero = () => (
  <section
    className="bg-ax-red-a relative z-1 -mt-[--spacing(var(--header-gap))] grid min-h-svh place-content-start pt-[calc(--spacing(var(--header-gap))+--spacing(10))] pb-10 text-white sm:block"
    aria-label="home"
    id="home"
  >
    <div
      className="absolute inset-0 -z-1 bg-cover bg-center bg-no-repeat brightness-65"
      style={{ backgroundImage: `url(${bannerBlur})` }}
    />
    <div className="container not-lg:mx-0">
      <div className="text-shadow-ax-black-a text-start sm:p-7.5">
        <h2 className="text-ax-white-a text-start text-3xl uppercase text-shadow-lg sm:text-5xl/[1.2] lg:text-6xl/[1.2]">
          <span className="text-ax-yellow-a block text-[3rem] font-bold sm:text-6xl/[1.2] lg:text-7xl/[1.2]">
            Logistics Made Easy
          </span>
          Safe and Affordable
        </h2>

        <p className="text-ax-white-a relative z-10 my-4 max-w-lg text-shadow-inherit sm:text-shadow-[0px_8px_50px]">
          AguXpress delivers more than just packages — we deliver peace of mind.
          Whether you need fast dispatch, safe pickup, reliable haulage, secure
          escrow, or insurance for your goods in transit, we're here to help you
          move smarter and worry less - anywhere in Nigeria.
        </p>

        <Link to="/start" className="hero-btn">
          Get Started
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
