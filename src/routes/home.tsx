import type { Route } from "./+types/home";
import Hero from "src/components/landing/Hero";
import About from "src/components/landing/About";
import Services from "src/components/landing/Services";
import HomeBlog from "@components/landing/HomeBlog";
import Contact from "src/components/landing/Contact";
import Subscribe from "src/components/landing/Subscribe";

export default function Home() {
  return (
    <article>
      <Hero />
      <About />
      <Services />
      <HomeBlog />
      <Contact />
      <Subscribe />
    </article>
  );
}
