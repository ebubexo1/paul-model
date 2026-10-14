import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, photos, categories } from "./data.js";

const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;

function Header() {
  return (
    <header className="nav">
      <a href="#top" className="nav-name">{profile.name}</a>
      <nav aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact" className="nav-cta">Book me</a>
      </nav>
    </header>
  );
}

function Hero() {
  const [first, ...rest] = profile.name.split(" ");
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="hero-role">
          <span className="dot" aria-hidden="true" /> {profile.role}, open to bookings
        </p>
        <h1>
          <span>{first}</span>
          <span>{rest.join(" ")}</span>
        </h1>
        <p className="hero-lede">
          Clean frames, sharp tailoring, easy on set. See the work, then send a brief.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href="#contact">Book a shoot</a>
          <a className="btn btn-line" href="#work">View portfolio</a>
        </div>
      </div>
      <figure className="hero-photo">
        <img src={img("pink-standing.jpg")} alt={`${profile.name} in a pink shirt and wide black trousers`} />
      </figure>
    </section>
  );
}

function Lightbox({ items, index, onClose, onMove }) {
  const closeRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [onClose, onMove]);

  const touch = useRef(null);
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1);
      }}
    >
      <button ref={closeRef} className="lb-btn lb-close" onClick={onClose} aria-label="Close">✕</button>
      <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); onMove(-1); }} aria-label="Previous photo">‹</button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={img(item.src)} alt={item.title} />
        <figcaption>
          {item.title}
          <span>{index + 1} of {items.length}</span>
        </figcaption>
      </figure>
      <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); onMove(1); }} aria-label="Next photo">›</button>
    </div>
  );
}

function Work() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const items = useMemo(
    () => (cat === "All" ? photos : photos.filter((p) => p.category === cat)),
    [cat]
  );
  const move = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length]
  );
  const close = useCallback(() => setOpen(null), []);

  return (
    <section className="section" id="work">
      <div className="section-head">
        <h2>Selected work</h2>
        <div className="filters" role="group" aria-label="Filter photos">
          {categories.map((c) => (
            <button
              key={c}
              className={c === cat ? "chip on" : "chip"}
              aria-pressed={c === cat}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid">
        {items.map((p, i) => (
          <li key={p.src} style={{ aspectRatio: `${p.w} / ${p.h}` }}>
            <button onClick={() => setOpen(i)} aria-label={`Open ${p.title}`}>
              <img src={img(p.src)} alt={p.title} loading="lazy" width={p.w} height={p.h} />
              <span className="cap">{p.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onMove={move} />}
    </section>
  );
}

function About() {
  const stats = profile.stats.filter((s) => s.value.trim());
  return (
    <section className="section about" id="about">
      <figure className="about-photo">
        <img src={img("white-shirt.jpg")} alt={`${profile.firstName} in a white shirt and leather cap`} loading="lazy" />
      </figure>
      <div className="about-body">
        <h2>About {profile.firstName}</h2>
        {profile.bio.map((t, i) => <p key={i}>{t}</p>)}

        <h3>Available for</h3>
        <ul className="tags">
          {profile.services.map((s) => <li key={s}>{s}</li>)}
        </ul>

        {stats.length > 0 && (
          <>
            <h3>Stats</h3>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
              ))}
            </dl>
          </>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const wa = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hi Chibueze, I saw your portfolio and I'd like to book you.")}`;
  return (
    <section className="section contact" id="contact">
      <h2>Let's book a shoot</h2>
      <p className="contact-lede">Call, text or message me the date, the location and what you are shooting. I reply within a day.</p>
      <div className="contact-actions">
        <a className="btn btn-solid" href={`tel:${profile.phone}`}>Call {profile.phone}</a>
        <a className="btn btn-line" href={`sms:${profile.phone}`}>Send a text</a>
        <a className="btn btn-line" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-line" href={`mailto:${profile.email}`}>Email</a>
        {profile.instagram && (
          <a className="btn btn-line" href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a>
        )}
      </div>
      <p className="contact-email">{profile.email}</p>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <footer className="foot">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}