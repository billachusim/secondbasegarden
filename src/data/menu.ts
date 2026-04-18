export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number; // in Naira
  category: string;
  tags?: ("new" | "spicy" | "popular")[];
  soldOut?: boolean;
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export const categories: Category[] = [
  { id: "grills", name: "Grills & BBQ", emoji: "🔥" },
  { id: "smallchops", name: "Small Chops", emoji: "🍢" },
  { id: "mains", name: "Main Dishes", emoji: "🍲" },
  { id: "cocktails", name: "Cocktails", emoji: "🍹" },
  { id: "beers", name: "Beers", emoji: "🍺" },
  { id: "spirits", name: "Spirits & Wine", emoji: "🥃" },
  { id: "soft", name: "Soft Drinks", emoji: "🥤" },
  { id: "shisha", name: "Shisha", emoji: "💨" },
];

export const menuItems: MenuItem[] = [
  // Grills
  { id: "g1", category: "grills", name: "Suya Platter", description: "Spiced beef skewers grilled over open flame, served with onions & yaji.", price: 5500, tags: ["spicy", "popular"] },
  { id: "g2", category: "grills", name: "Grilled Catfish (Whole)", description: "Whole catfish, peppered & grilled, served with plantain.", price: 9000, tags: ["popular"] },
  { id: "g3", category: "grills", name: "Asun (Peppered Goat)", description: "Smoky peppered goat meat, hot & spicy.", price: 7500, tags: ["spicy"] },
  { id: "g4", category: "grills", name: "BBQ Chicken Wings", description: "8 pieces of glazed chicken wings.", price: 6000 },
  { id: "g5", category: "grills", name: "Grilled Croaker Fish", description: "Fresh croaker fish, grilled with house spice.", price: 8500 },

  // Small chops
  { id: "s1", category: "smallchops", name: "Small Chops Platter", description: "Puff puff, samosa, spring roll, peppered gizzard.", price: 4500, tags: ["popular"] },
  { id: "s2", category: "smallchops", name: "Peppered Gizzard", description: "Spicy gizzards, fried to perfection.", price: 3500, tags: ["spicy"] },
  { id: "s3", category: "smallchops", name: "Spring Rolls (6 pcs)", description: "Crispy vegetable spring rolls.", price: 2500 },
  { id: "s4", category: "smallchops", name: "Samosa (6 pcs)", description: "Golden beef samosas.", price: 2500 },

  // Mains
  { id: "m1", category: "mains", name: "Jollof Rice & Chicken", description: "Smoky party-style jollof with grilled chicken.", price: 4500, tags: ["popular"] },
  { id: "m2", category: "mains", name: "Fried Rice & Beef", description: "Fried rice with mixed veg & beef.", price: 4500 },
  { id: "m3", category: "mains", name: "Pounded Yam & Egusi", description: "Smooth pounded yam with rich egusi soup.", price: 5500 },
  { id: "m4", category: "mains", name: "Pepper Soup (Catfish)", description: "Hot, aromatic catfish pepper soup.", price: 6500, tags: ["spicy"] },
  { id: "m5", category: "mains", name: "Nkwobi", description: "Spicy cow foot delicacy in palm oil sauce.", price: 5500, tags: ["spicy"] },

  // Cocktails
  { id: "c1", category: "cocktails", name: "Chapman", description: "House classic — sweet, citrusy & refreshing.", price: 3500, tags: ["popular"] },
  { id: "c2", category: "cocktails", name: "Mojito", description: "Mint, lime, white rum, soda.", price: 4500 },
  { id: "c3", category: "cocktails", name: "Pina Colada", description: "Pineapple, coconut cream, white rum.", price: 4500 },
  { id: "c4", category: "cocktails", name: "Long Island Iced Tea", description: "Five spirits, cola, lemon.", price: 5500, tags: ["new"] },
  { id: "c5", category: "cocktails", name: "Garden Spritz", description: "Our signature — gin, hibiscus, citrus.", price: 5000, tags: ["new"] },

  // Beers
  { id: "b1", category: "beers", name: "Star Lager", price: 1500 },
  { id: "b2", category: "beers", name: "Heineken", price: 2000 },
  { id: "b3", category: "beers", name: "Guinness Stout", price: 2000 },
  { id: "b4", category: "beers", name: "Hero Lager", price: 1500 },
  { id: "b5", category: "beers", name: "Trophy", price: 1500 },

  // Spirits & wine
  { id: "sp1", category: "spirits", name: "Hennessy VS (Bottle)", price: 65000 },
  { id: "sp2", category: "spirits", name: "Jack Daniel's (Bottle)", price: 55000 },
  { id: "sp3", category: "spirits", name: "Moët & Chandon", price: 95000 },
  { id: "sp4", category: "spirits", name: "Red Wine (House)", description: "Glass of house red.", price: 4500 },
  { id: "sp5", category: "spirits", name: "Andre Champagne", price: 18000 },

  // Soft drinks
  { id: "sd1", category: "soft", name: "Coke / Fanta / Sprite", price: 700 },
  { id: "sd2", category: "soft", name: "Bottled Water", price: 500 },
  { id: "sd3", category: "soft", name: "Chivita Juice", price: 1500 },
  { id: "sd4", category: "soft", name: "Red Bull", price: 2500 },
  { id: "sd5", category: "soft", name: "Fresh Zobo", description: "Chilled hibiscus drink.", price: 1500 },

  // Shisha
  { id: "sh1", category: "shisha", name: "Classic Shisha", description: "Choose your flavour: mint, grape, apple, blueberry.", price: 6000, tags: ["popular"] },
  { id: "sh2", category: "shisha", name: "Premium Shisha", description: "Double apple, mixed fruit, ice mint.", price: 8000 },
  { id: "sh3", category: "shisha", name: "Shisha Refill", price: 3500 },
];

export const venue = {
  name: "2nd Baze Garden",
  tagline: "Asaba's favourite garden lounge — grills, cocktails & good vibes, 24/7.",
  address: "20 DBS Road, Off Okpanam Road, Asaba, Delta State",
  phone: "+2348000000000",
  whatsapp: "2348000000000", // E.164 without +
  hours: "Open 24 hours, every day",
  mapEmbed: "https://www.google.com/maps?q=2nd+Base+Garden+Asaba&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=2nd+Base+Garden+Asaba",
  reviewLink: "https://search.google.com/local/writereview?placeid=2nd+Base+Garden+Asaba",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
};

export const services = [
  {
    id: "events",
    title: "Private Events",
    description: "Birthdays, bridal showers, corporate hangouts — host it in our garden.",
    emoji: "🎉",
  },
  {
    id: "reservations",
    title: "Table Reservations",
    description: "Reserve a table or VIP section ahead of time. Skip the wait.",
    emoji: "📅",
  },
  {
    id: "bottles",
    title: "Bottle Service",
    description: "Order champagne, premium spirits & mixers straight to your table.",
    emoji: "🍾",
  },
  {
    id: "shisha",
    title: "Shisha Lounge",
    description: "Premium flavours, comfortable seating, perfect ambience.",
    emoji: "💨",
  },
];

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG");
