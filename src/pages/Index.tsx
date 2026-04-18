import { About } from "@/components/About";
import { CallWaiterButton } from "@/components/CallWaiterButton";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Services } from "@/components/Services";
import { Social } from "@/components/Social";
import { useCategories, useMenuItems, useServices, useSettings } from "@/hooks/useVenueData";

const Index = () => {
  const { data: settings } = useSettings();
  const { data: categories } = useCategories();
  const { data: items } = useMenuItems();
  const { data: services } = useServices();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings?.venue_name || "2nd Baze Garden",
    address: settings?.address,
    telephone: settings?.phone,
    openingHours: "Mo-Su 00:00-23:59",
    servesCuisine: ["Nigerian", "Bar & Grill"],
    priceRange: "₦₦",
  };

  return (
    <main>
      <Hero settings={settings} />
      <About settings={settings} />
      <MenuSection categories={categories} items={items} />
      <Services services={services} settings={settings} />
      <Social settings={settings} />
      <Footer settings={settings} />
      <CallWaiterButton whatsapp={settings?.whatsapp || ""} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
};

export default Index;
