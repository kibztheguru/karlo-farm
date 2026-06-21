import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import WhatsappButton from "@/components/WhatsappButton";

import { getSettings } from "@/lib/settings";

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />

      <Hero settings={settings} />

      <Stats />

      <About settings={settings} />

      <Products />

      <Gallery />

      <Testimonials />

      <Contact settings={settings} />

      <Footer settings={settings} />

      <WhatsappButton />
    </>
  );
}