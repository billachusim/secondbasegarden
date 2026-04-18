
# 2nd Baze Garden — Digital Menu & Landing Page

A mobile-first landing page that customers reach by scanning a single QR code at the venue. Owner manages everything from a private admin dashboard.

## Brand & Look
- Warm garden-lounge feel: deep green + amber/gold accents on a soft cream background, with a darker "evening" mode for nighttime scans.
- Large food photos, generous spacing, big readable prices in ₦ (Naira).
- Smooth scroll, sticky category bar, fast loading on mobile data.

## Customer-Facing Page (/)
1. **Hero** — Venue name, tagline, hero photo, "Open 24 hours" badge, quick "Call Waiter" floating button.
2. **About** — Short intro, address (20 DBS Road, Okpanam Rd, Asaba), phone, opening hours, embedded Google Map.
3. **Menu** — The main attraction:
   - Sticky horizontal category tabs (e.g. Grills, Small Chops, Cocktails, Beers, Soft Drinks, Shisha…)
   - Each item: photo, name, short description, price, optional "Sold out" / "New" / "Spicy" tags.
   - Search bar to find items quickly.
4. **Services** — Cards for offerings like Private Events, Reservations, Bottle Service, etc., each with a "Reserve via WhatsApp" button.
5. **Social & Reviews** — Instagram / Facebook / TikTok links + a "Leave a Google Review" button.
6. **Footer** — Address, phone, hours, copyright.

## Call Waiter Button
- Floating button visible on every section.
- Tapping it opens a small sheet: "Need help?" → options like *Call Waiter*, *Request Bill*, *Order Shisha*.
- Sends a pre-filled WhatsApp message to the venue's number (e.g. "Hi, I'd like to call a waiter. Table: __"). Customer types their table number once; it's remembered on their device.

## QR Code
- Admin page generates one printable QR pointing to the live site.
- Download as PNG/PDF, sized for table tents and posters, with the venue logo in the center.

## Admin Dashboard (/admin)
Private — accessible only after email + password login.
- **Login page** for staff.
- **Menu manager**: add/edit/delete items, upload photos, set price, assign category, toggle Available / Sold out, mark as New/Spicy.
- **Category manager**: create, rename, reorder categories (drag handle).
- **Services manager**: edit the services cards.
- **Settings**: venue info (address, phone, WhatsApp number, hours, social links), hero image.
- **QR code**: preview + download.

## Backend (Lovable Cloud)
- Auth for admin login (email/password).
- Database tables for: categories, menu items, services, settings, admin users (with a secure roles table — never on profiles).
- Image storage for menu photos and hero image.
- All admin actions protected by row-level security; public site reads published data only.

## Build Phases
1. **Phase 1** — Public landing page with a starter menu (placeholder items), call-waiter button, About/Services/Social sections, mobile-polished design.
2. **Phase 2** — Lovable Cloud + admin login + menu/category/services/settings management with image uploads.
3. **Phase 3** — QR code generator page in admin (downloadable PNG/PDF).

After Phase 1 you can already print a QR and use the page; Phases 2 & 3 make it self-managed.
