import { useEffect, useState } from "react";
import { model, photos, heroPhoto } from "./data.js";

function Lightbox({ index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onMove]);

  const photo = photos[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <img src={photo.src} alt={photo.alt} onClick={(e) => e.stopPropagation()} />
      <button className="lb-btn lb-close" onClick={onClose} aria-label="Close">Close</button>
      <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); onMove(-1); }} aria-label="Previous photo">Prev</button>
      <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); onMove(1); }} aria-label="Next photo">Next</button>
    </div>
  );
}

function BookingForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", type: model.jobTypes[0], date: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const subject = `Booking request: ${form.type}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Job type: ${form.type}`,
      `Date: ${form.date || "Not set"}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${model.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="booking" onSubmit={submit}>
      <label>Your name
        <input required value={form.name} onChange={set("name")} autoComplete="name" />
      </label>
      <label>Email
        <input required type="email" value={form.email} onChange={set("email")} autoComplete="email" />
      </label>
      <label>Phone or WhatsApp
        <input value={form.phone} onChange={set("phone")} autoComplete="tel" />
      </label>
      <label>Type of job
        <select value={form.type} onChange={set("type")}>
          {model.jobTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label>Preferred date
        <input type="date" value={form.date} onChange={set("date")} />
      </label>
      <label className="wide">Project details
        <textarea rows="4" required value={form.message} onChange={set("message")} placeholder="Brand, location, usage, budget" />
      </label>
      <button className="cta" type="submit">Send booking request</button>
      {sent && (
        <p className="note" role="status">
          Your email app should open with the request filled in. If it does not, write to {model.email}.
        </p>
      )}
    </form>
  );
}

export default function App() {
  const [open, setOpen] = useState(null);
  const move = (d) => setOpen((i) => (i + d + photos.length) % photos.length);
  const stats = model.stats.filter((s) => s.value);

  return (
    <>
      <header className="top">
        <a href="#top" className="brand">{model.name}</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#book" className="pill">Book me</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="role"><span className="dot" aria-hidden="true" />{model.role}</p>
            <h1><span>{model.first}</span><span className="pink">{model.last}</span></h1>
            <p className="intro">{model.intro[0]}<br />{model.intro[1]}</p>
            <div className="btns">
              <a className="cta" href="#book">Book a shoot</a>
              <a className="ghost" href="#work">View portfolio</a>
            </div>
          </div>
          <img className="hero-img" src={heroPhoto.src} alt={heroPhoto.alt} />
        </section>

        <section id="work" className="section">
          <h2>Work</h2>
          <div className="grid">
            {photos.map((ph, i) => (
              <button key={ph.src} className="tile" onClick={() => setOpen(i)} aria-label={`Open photo: ${ph.alt}`}>
                <img src={ph.src} alt={ph.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <h2>About</h2>
          <p className="bio">{model.bio}</p>
          {stats.length > 0 && (
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
              ))}
            </dl>
          )}
        </section>

        <section id="book" className="section">
          <h2>Book a shoot</h2>
          <p className="lead">Tell us about the job. You will get a reply by email.</p>
          <BookingForm />
        </section>
      </main>

      <footer>
        <span>{model.name}</span>
        <span>{new Date().getFullYear()}</span>
      </footer>

      {open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onMove={move} />}
    </>
  );
}
