import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./hero.css";
import carImg from "./assets/car.png";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "98%", label: "Retention Boost" },
  { value: "2.4x", label: "Faster Delivery" },
  { value: "45%", label: "Cost Reduction" },
];

function spacedLetters(text) {
  // "WELCOME ITZ FIZZ" -> "W E L C O M E  I T Z F I Z Z"
  return text
    .toUpperCase()
    .split("")
    .map((ch) => (ch === " " ? "\u00A0\u00A0" : ch))
    .join(" ");
}

export default function HeroScroll() {
  const rootRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const visualRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Intro: headline letters + stats stagger
      const letters = headlineRef.current?.querySelectorAll("[data-letter]") || [];
      const statItems = statsRef.current?.querySelectorAll("[data-stat]") || [];

      gsap.set([headlineRef.current, statsRef.current], { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        letters,
        { y: 18, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.035, duration: 0.8 }
      ).fromTo(
        statItems,
        { y: 14, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.12, duration: 0.6 },
        "-=0.25"
      );

      // Scroll-tied motion (core feature)
      gsap.to(visualRef.current, {
        x: 240,
        y: 90,
        rotate: 12,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Glow drift
      gsap.to(glowRef.current, {
        x: -160,
        y: 60,
        scale: 1.15,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background subtle parallax
      gsap.to("[data-bg]", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const title = "WELCOME ITZ FIZZ";
  const spaced = spacedLetters(title);

  return (
    <>
      <section ref={rootRef} className="hero">
        <div data-bg className="hero-bg" />

        <div ref={glowRef} className="hero-glow" />

        <div className="hero-inner">
          <h1 ref={headlineRef} className="hero-title" aria-label={title}>
            {spaced.split("").map((ch, idx) => (
              <span key={idx} data-letter className="hero-letter">
                {ch}
              </span>
            ))}
          </h1>

          <div ref={statsRef} className="hero-stats">
            {stats.map((s) => (
              <div key={s.value} data-stat className="stat-card">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

    
              {/* Replace this block with your image/object */}
              <div className="hero-visual-wrap">
            <div ref={visualRef} className="hero-visual">
              {/* Put your image in /public e.g. car.png */}
              <img
                 src={carImg}
                alt="Main Visual"
                className="hero-image"
                draggable="false"
              />
            </div>
          </div>

          <div className="hero-hint">Scroll down — animation is tied to scroll progress.</div>
        </div>
      </section>

      {/* Extra space so scrolling is possible */}
      <section className="next">
        <div className="next-inner">
          <h2>Next Section</h2>
          <p>
            Add more sections/scenes here. You can attach more ScrollTriggers for a
            full “car-scroll” style story.
          </p>
        </div>
      </section>
    </>
  );
}
