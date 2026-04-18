import { About } from "@/components/About";
import { CallWaiterButton } from "@/components/CallWaiterButton";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Services } from "@/components/Services";
import { Social } from "@/components/Social";
import { venue } from "@/data/menu";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: venue.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "20 DBS Road, Off Okpanam Road",
      addressLocality: "Asaba",
      addressRegion: "Delta",
      addressCountry: "NG",
    },
    telephone: venue.phone,
    openingHours: "Mo-Su 00:00-23:59",
    servesCuisine: ["Nigerian", "Bar & Grill"],
    priceRange: "₦₦",
  };

  return (
    <main>
      <Hero />
      <About />
      <MenuSection />
      <Services />
      <Social />
      <Footer />
      <CallWaiterButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
};

export default Index;
