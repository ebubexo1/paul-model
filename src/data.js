// ─────────────────────────────────────────────
//  EDIT THIS FILE to change anything on the site.
// ─────────────────────────────────────────────

export const profile = {
  name: "Chibueze Gozie Paul",
  firstName: "Chibueze",
  role: "Fashion & lifestyle model",
  email: "goziechibueze20@gmail.com",
  phone: "09040916762",
  whatsapp: "2349040916762", // country code + number, no "+" or spaces
  instagram: "", // e.g. "https://instagram.com/yourhandle" (hidden if empty)
  bio: [
    "I model streetwear, tailoring and lifestyle looks. I take direction well, hold a still frame, and bring my own ideas to the set.",
    "Available for editorial shoots, lookbooks, brand campaigns, runway and content for creators. Send me the brief and the date and I will reply quickly.",
  ],
  // Fill these in. Any stat left empty is hidden from the site.
  stats: [
    { label: "Height", value: "" },
    { label: "Chest", value: "" },
    { label: "Waist", value: "" },
    { label: "Shoe size", value: "" },
    { label: "Hair", value: "" },
    { label: "Eyes", value: "" },
  ],
  services: ["Editorial", "Lookbooks", "Brand campaigns", "Runway", "Content creation"],
};

export const categories = ["All", "Style", "Studio", "Mood"];

// src = file inside /public/images
export const photos = [
  { src: "pink-standing.jpg", title: "Pink on black", category: "Style", w: 960, h: 1280 },
  { src: "silhouette.jpg", title: "Arch light", category: "Mood", w: 960, h: 1280 },
  { src: "white-shirt.jpg", title: "White shirt, leather cap", category: "Studio", w: 592, h: 792 },
  { src: "red-chairs.jpg", title: "Wine room", category: "Mood", w: 708, h: 947 },
  { src: "pink-seated.jpg", title: "Slides and stars", category: "Style", w: 592, h: 792 },
  { src: "guitar-wall.jpg", title: "Studio wall", category: "Studio", w: 591, h: 790 },
  { src: "nike-boxes.jpg", title: "Fresh pairs", category: "Mood", w: 592, h: 792 },
  { src: "stripe-shirt.jpg", title: "Blue hour", category: "Studio", w: 591, h: 790 },
  { src: "black-kaftan.jpg", title: "Black kaftan", category: "Style", w: 498, h: 666 },
];
