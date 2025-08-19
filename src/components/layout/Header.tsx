import { Link } from "react-router";
import {
  IoCloseOutline,
  IoChevronForward,
  IoCallOutline,
  IoMenuOutline,
} from "react-icons/io5";
import primaryLogo from "@logos/primary.png";

const Header = () => (
  <header className="bg-ax-red-a fixed top-0 z-4 flex w-full items-center justify-between px-4 py-4">
    <Link to="/">
      <img
        src={primaryLogo}
        loading="lazy"
        className="drop-shadow-ax-black-d h-20 w-auto drop-shadow-xs"
      />
    </Link>

    <nav className="hidden">
      <div className="navbar-top">
        <Link to="#" className="uppercase">
          AguXpress
        </Link>

        <button className="text-4xl" aria-label="Close menu">
          <IoCloseOutline />
        </button>
      </div>

      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#home" className="navbar-link" data-nav-link>
            <span>Home</span>

            <IoChevronForward />
          </a>
        </li>

        <li className="navbar-item">
          <a href="#about" className="navbar-link" data-nav-link>
            <span>About</span>

            <IoChevronForward />
          </a>
        </li>

        <li className="navbar-item">
          <span
            className="navbar-link"
            // href="#services"
            tabIndex={0}
            data-nav-sub
          >
            <span> Services </span>
            <i className="ri-arrow-down-s-line dropdown__arrow"></i>

            <IoChevronForward />
          </span>
          <ul className="nav-children">
            <li>Haulage</li>
            <li>Dispatch</li>
            <li>Pickup</li>
            <li>Insurance Coverage</li>
            <li>Escrow</li>
          </ul>
        </li>

        <li className="navbar-item">
          <span
            className="navbar-link"
            // href="#shipping"
            tabIndex={0}
            data-nav-sub
          >
            <span> Shipping </span>
            <i className="ri-arrow-down-s-line dropdown__arrow"></i>

            <IoChevronForward />
          </span>
          <ul className="nav-children">
            <li>Ship a Package</li>
            <li>Get a Quote</li>
            <li>Schedule a Pickup</li>
            <li>Shipping History</li>
          </ul>
        </li>

        <li className="navbar-item">
          <a href="#blog" className="navbar-link" data-nav-link>
            <span>Blog</span>

            <IoChevronForward />
          </a>
        </li>

        <li className="navbar-item">
          <a href="#contact" className="navbar-link" data-nav-link>
            <span>Contact</span>

            <IoChevronForward />
          </a>
        </li>
      </ul>
    </nav>

    <div className="header-contact hidden">
      <div>
        <p className="contact-label">Call Us Now</p>

        <a href="tel:+2347087673400" className="contact-number">
          0708 767 3400
        </a>
      </div>

      <div className="contact-icon">
        <IoCallOutline />
      </div>
    </div>

    <button className="text-ax-white-a text-4xl" aria-label="Open menu">
      <IoMenuOutline className="ion-icon" />
    </button>

    <div className="hidden"></div>
  </header>
);

export default Header;
