"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const title = "Welcome to Your New Home";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const heroHeight = heroRef.current?.offsetHeight ?? 0;
      setShowMobileBar(y > heroHeight * 0.6);
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `translateY(${Math.min(y * 0.25, 120)}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("fname") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("femail") as HTMLInputElement).value.trim();
    const area = (form.elements.namedItem("floc") as HTMLSelectElement).value;
    const budget = (form.elements.namedItem("fbudget") as HTMLSelectElement).value;
    const roomType = (form.elements.namedItem("fcategory") as HTMLSelectElement).value;

    setSubmitting(true);
    const { error: insertError } = await supabase.from("waitlist_entries").insert({
      full_name: fullName,
      email,
      area,
      budget,
      room_type: roomType,
    });
    setSubmitting(false);

    if (insertError) {
      if (insertError.code === "23505") {
        setError("That email is already on the waitlist.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    setSubmitted(true);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 34V22C4 22 4 16 10 16C10 16 10 10 14 10V6H26V10C30 10 30 16 30 16C36 16 36 22 36 22V34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 34V24H22V34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Malete</span>
        </div>
        <div className="nav-links">
          <a href="#top">Home</a>
          <a href="#explore">Explore</a>
          <a href="#owners">Hostel Owners</a>
          <a href="#about">About</a>
          <a href="#waitlist" className="nav-cta">Join Waitlist</a>
        </div>
      </nav>

      <section className="hero" id="top" ref={heroRef}>
        <img ref={heroImgRef} className="hero-img" src="/gate-1.jpg" alt="Kwara State University main gate" />
        <div className="hero-overlay" />
        <svg className="hero-bird" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 18C10 8 16 8 20 14C24 8 30 8 38 18M22 20C30 10 36 10 40 16C44 10 50 10 58 20" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="hero-content">
          <div className="hero-eyebrow">Malete, Kwara State</div>
          <h1>
            {title.split("").map((ch, i) => (
              <span
                key={i}
                className="char"
                style={{ animationDelay: `${0.55 + i * 0.028}s` }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>
          <p>
            Find verified accommodation around Kwara State University before resumption.
            Compare prices, see how far you&apos;ll be from campus, and reserve your spot
            before the rush starts.
          </p>
          <div className="hero-actions">
            <a href="#waitlist" className="btn-primary">
              Join the Waitlist
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll to explore</span>
          <div className="stem" />
        </div>
      </section>

      <div className="gate-divider">
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 90V60C0 60 200 60 260 40C300 26 330 0 360 0C390 0 420 26 460 40C520 60 720 60 780 40C820 26 850 0 880 0C910 0 940 26 980 40C1040 60 1240 60 1300 40C1340 26 1380 60 1440 60V90H0Z" fill="#FAF6EE" />
        </svg>
      </div>

      <section className="section" id="explore">
        <div className="section-head">
          <div className="eyebrow">Before resumption</div>
          <h2>Everything you need before resumption.</h2>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11L12 4L21 11M5 10V20H19V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <h3>Find hostels</h3>
            <p>Verified rooms around Malete, sorted by distance to campus and your budget.</p>
          </div>
          <div className="card">
            <div className="card-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" /><circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" /><path d="M2 20C2 16 4.5 14 8 14C11.5 14 14 16 14 20M14 20C14 16.5 16 15 18.5 15C21 15 22 16.5 22 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></div>
            <h3>Find a roommate</h3>
            <p>Match with other incoming students looking to share a room or an apartment.</p>
          </div>
          <div className="card">
            <div className="card-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 5 5 9C5 14 12 22 12 22C12 22 19 14 19 9C19 5 16 2 12 2Z" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" /></svg></div>
            <h3>Explore areas around campus</h3>
            <p>See what&apos;s near each hostel, markets, shuttle routes, banks, and clinics.</p>
          </div>
          <div className="card">
            <div className="card-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3L14.6 8.6L20.8 9.4L16.2 13.4L17.5 19.5L12 16.4L6.5 19.5L7.8 13.4L3.2 9.4L9.4 8.6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg></div>
            <h3>Verified reviews</h3>
            <p>Honest notes from students who&apos;ve actually lived there, not the landlord.</p>
          </div>
        </div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <img className="gate-watermark left" src="/gate-2.jpg" alt="" />
        <img className="gate-watermark right" src="/gate-1.jpg" alt="" />
        <div className="waitlist-wrap">
          <div className="waitlist-copy">
            <div className="eyebrow">Reserve your spot</div>
            <h2>Never arrive at Malete without knowing where you&apos;ll stay.</h2>
            <p>
              We&apos;re building the accommodation hub for students at Kwara State
              University, starting right here in Malete. Join the waitlist and you&apos;ll
              be the first to know when verified listings open.
            </p>
            <div className="waitlist-tag">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 3L14.6 8.6L20.8 9.4L16.2 13.4L17.5 19.5L12 16.4L6.5 19.5L7.8 13.4L3.2 9.4L9.4 8.6L12 3Z" stroke="currentColor" strokeWidth="1.6" /></svg>
              First 500 sign-ups get a founding member badge
            </div>
          </div>

          <div className="admission-card">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="ticket-row">
                  <div>
                    <div className="label-top">Admit one</div>
                    <div className="label-sub">Reserve your spot</div>
                  </div>
                  <div className="ticket-mark">
                    <svg viewBox="0 0 40 40" fill="none"><path d="M4 34V22C4 22 4 16 10 16C10 16 10 10 14 10V6H26V10C30 10 30 16 30 16C36 16 36 22 36 22V34" stroke="#1E3A2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 34V24H22V34" stroke="#1E3A2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="fname">Full name</label>
                  <input type="text" id="fname" name="fname" placeholder="e.g. Amina Yusuf" required />
                </div>

                <div className="field">
                  <label htmlFor="femail">Email</label>
                  <input type="email" id="femail" name="femail" placeholder="e.g. amina@example.com" required />
                </div>

                <div className="field select-wrap">
                  <label htmlFor="floc">Where in Malete would you like to stay?</label>
                  <select id="floc" name="floc" required defaultValue="">
                    <option value="" disabled>Select an area</option>
                    <option>Westend</option>
                    <option>School Gate</option>
                    <option>Safari</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div className="field select-wrap">
                  <label htmlFor="fbudget">Expected budget</label>
                  <select id="fbudget" name="fbudget" required defaultValue="">
                    <option value="" disabled>Select a range</option>
                    <option>Below ₦150,000</option>
                    <option>₦150,000 – ₦200,000</option>
                    <option>₦200,000 – ₦250,000</option>
                    <option>₦250,000 – ₦300,000</option>
                    <option>₦300,000 – ₦350,000</option>
                    <option>Above ₦350,000</option>
                  </select>
                </div>

                <div className="field select-wrap">
                  <label htmlFor="fcategory">Room type</label>
                  <select id="fcategory" name="fcategory" required defaultValue="">
                    <option value="" disabled>Select an option</option>
                    <option>Self-contained</option>
                    <option>Single room</option>
                    <option>Shared room</option>
                    <option>Any</option>
                  </select>
                </div>

                {error && (
                  <p style={{ color: "#B33A3A", fontSize: "13px", marginBottom: "14px" }}>
                    {error}
                  </p>
                )}

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Joining..." : "Join the Waitlist"}
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                <div className="founding-note">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3L14.6 8.6L20.8 9.4L16.2 13.4L17.5 19.5L12 16.4L6.5 19.5L7.8 13.4L3.2 9.4L9.4 8.6L12 3Z" stroke="currentColor" strokeWidth="1.6" /></svg>
                  The first 500 students get a founding member badge
                </div>
              </form>
            ) : (
              <div className="form-success">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.6" /><path d="M8 12L11 15L16 9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <h3>You&apos;re on the list</h3>
                <p>We&apos;ll email you as soon as verified hostels open around Malete. Welcome to KWASU.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer id="about">
        <svg className="foot-gate" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 34V22C4 22 4 16 10 16C10 16 10 10 14 10V6H26V10C30 10 30 16 30 16C36 16 36 22 36 22V34" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 34V24H22V34" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="foot-name">Malete</div>
        <p>Built for students at Kwara State University. Starting in Malete, one hostel at a time.</p>
        <div className="foot-bottom">Not officially affiliated with Kwara State University.</div>
      </footer>

      <div className={`mobile-bar ${showMobileBar ? "show" : ""}`}>
        <span>Ready before resumption?</span>
        <a href="#waitlist">Join Waitlist</a>
      </div>
    </>
  );
}