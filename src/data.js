// Edit this file to update the site. No other file needs to change for content.
export const model = {
  name: "Chibueze Gozie Paul",
  first: "Chibueze",
  last: "Gozie Paul",
  role: "Fashion & lifestyle model, open to bookings",
  intro: ["Clean frames, sharp tailoring, easy on set.", "See the work, then send a brief."],
  bio: "Chibueze works across streetwear, lifestyle and campaign shoots. He is easy to direct, arrives prepared and delivers a clean set of frames every time.",
  email: "goziechibueze20@gmail.com", // booking requests go here
  phone: "09040916762",
  whatsapp: "2349040916762",
  phone: "09040916762",
  whatsapp: "2349040916762",
  // Fill in what you want shown. Empty values are hidden.
  stats: [
    { label: "Height", value: "" },
    { label: "Chest", value: "" },
    { label: "Waist", value: "" },
    { label: "Shoe", value: "" },
    { label: "Based in", value: "" },
  ],
  jobTypes: ["Photo shoot", "Runway", "Campaign", "Brand content", "Other"],
};

export const heroPhoto = { src: "/images/pink-standing.jpg", alt: "Standing against a dark door in a pink shirt and black hat" };

const p = (file, alt) => ({ src: `/images/${file}`, alt });

export const photos = [
  p("look-3.jpeg", "Seated on a red sofa in a black E-Wears tracksuit and white trucker cap"),
  p("look-1.jpeg", "Close crop with a hand over the face, yellow G-Shock watch, black zip jacket"),
  p("look-2.jpeg", "Leaning back in a red armchair, wide-leg black trousers"),
  p("look-5.jpeg", "Sitting on a black sofa beside a patterned window blind"),
  p("look-4.jpeg", "Low angle by a white cabinet, red armchairs behind"),
  p("black-kaftan.jpg", "Black kaftan look"),
  p("pink-standing.jpg", "Standing against a dark door in a pink shirt"),
  p("pink-seated.jpg", "Seated in pink"),
  p("red-chairs.jpg", "Red chairs"),
  p("white-shirt.jpg", "White shirt"),
  p("stripe-shirt.jpg", "Striped shirt"),
  p("guitar-wall.jpg", "Guitar wall"),
];

