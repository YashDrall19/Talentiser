import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DepthSurface } from "@/components/site/DepthSurface";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Services — Tech & Business Hiring Solutions | Talentiser" },
      {
        name: "description",
        content:
          "Executive search, permanent hiring, GCC as a Service, RPO and startup acquihiring — Talentiser is your partner for tech and business hiring.",
      },
      { property: "og:title", content: "Services — Tech & Business Hiring Solutions | Talentiser" },
      {
        property: "og:description",
        content: "Executive search, permanent hiring, GCC as a Service, RPO and startup acquihiring from Talentiser.",
      },
    ],
  }),
  component: ServicesPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    title: "Executive Hiring Services",
    text: "Unlock Leadership Potential with Our Executive Search Expertise.",
    img: "svc-executive",
    href: "https://talentiser.com/services/executive-search/",
  },
  {
    title: "Permanent Hiring Services",
    text: "We specialize in sourcing top-tier professionals who will contribute to your business over the long term.",
    img: "svc-permanent",
    href: "https://talentiser.com/services/permanent-hiring/",
  },
  {
    title: "GCC as a Service",
    text: "As your setup in India grows, so do your talent needs. Our recruitment solutions are fully scalable, enabling you to hire for large-scale projects or niche roles as required.",
    img: "svc-gcc",
    href: "https://talentiser.com/services/gcc-as-a-service/",
  },
  {
    title: "RPO Services",
    text: "Transform Your Hiring Process with Tailored RPO Solutions.",
    img: "svc-rpo",
    href: "https://talentiser.com/services/rpo/",
  },
  {
    title: "Startup Acquihiring",
    text: "We collaborate and partner with some of the leading stakeholders in the Acqui-hiring and acquisition ecosystem devising and executing transformational growth opportunities.",
    img: "svc-acquihiring",
    href: "https://acquihire.in/",
  },
];

function Eyebrow({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-primary" />
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-32 md:grid-cols-2 md:pt-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="relative order-2 md:order-1"
      >
        <div className="absolute inset-8 -z-10 rounded-full bg-secondary blur-3xl" />
        <motion.img
          src="/images/services-hero.webp"
          alt="Talentiser recruiters with hiring icons"
          width={559}
          height={470}
          className="mx-auto w-full max-w-md md:max-w-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="order-1 md:order-2" style={{ perspective: 1000 }}>
        <motion.div
          initial={{ opacity: 0, rotateX: 35, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          style={{ transformOrigin: "bottom center" }}
        >
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-5 text-5xl leading-tight md:text-6xl">
            Your Partner for Tech and <span className="italic text-gradient">Business Hiring</span> Solutions
          </h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <Button asChild size="lg" className="mt-9 rounded-full">
            <Link to="/contact">
              Connect with us <ArrowUpRight />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <Eyebrow>Services</Eyebrow>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 50, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: (i % 2) * 0.12 }}
            style={{ transformPerspective: 1200 }}
          >
            <DepthSurface className="overflow-hidden rounded-3xl border bg-card">
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group block h-full">
                <div className="aspect-[625/370] overflow-hidden">
                  <img
                    src={`/images/${s.img}.webp`}
                    alt={s.title}
                    width={625}
                    height={370}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="depth-content p-7">
                  <h2 className="flex items-start justify-between gap-4 text-2xl md:text-3xl">
                    {s.title}
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </a>
            </DepthSurface>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Clients() {
  const slides = ["logos-1", "logos-2", "logos-3"];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % slides.length), 4500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Eyebrow center>Our clients</Eyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl">Brands That Trust Us</h2>
        <div className="relative mt-12 grid" aria-live="polite">
          <AnimatePresence initial={false}>
            <motion.img
              key={slides[active]}
              src={`/images/${slides[active]}.png`}
              alt="Logos of companies that hire with Talentiser"
              className="col-start-1 row-start-1 mx-auto w-full rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
          {/* reserve the tallest slide's height so the section never jumps */}
          <img src="/images/logos-1.png" alt="" aria-hidden className="invisible col-start-1 row-start-1 w-full" />
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s}
              type="button"
              aria-label={`Show client logos ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <DepthSurface className="overflow-hidden rounded-3xl bg-gradient-primary">
        <div className="depth-content flex flex-col items-start gap-8 p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="max-w-xl text-4xl md:text-5xl"
          >
            Let’s Elevate Your Hiring Strategy Together
          </motion.h2>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link to="/contact">
              Connect with us <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </DepthSurface>
    </section>
  );
}

function ServicesPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-x-clip">
        <Hero />
        <ServiceGrid />
        <Clients />
        <Cta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
