import { Link } from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DepthSurface } from "./DepthSurface";
import { Footer } from "./Footer";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Shared wrapper for inner pages: reduced-motion support, clipped horizontal motion and the site footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-x-clip">{children}</main>
      <Footer />
    </MotionConfig>
  );
}

export function Eyebrow({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-primary" />
      {children}
    </p>
  );
}

/** Fades and lifts content into view once. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Two-column page opening: title with a 3D text entrance, optional breadcrumb or action, floating illustration. */
export function PageHero({
  title,
  crumb,
  image,
  imageAlt,
  imageSize,
  action,
}: {
  title: ReactNode;
  crumb?: string;
  image: string;
  imageAlt: string;
  imageSize: [number, number];
  action?: ReactNode;
}) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-32 md:grid-cols-2 md:pb-20 md:pt-40">
      <div style={{ perspective: 1000 }}>
        <motion.div
          initial={{ opacity: 0, rotateX: 35, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          style={{ transformOrigin: "bottom center" }}
        >
          <h1 className="text-5xl leading-tight md:text-6xl">{title}</h1>
        </motion.div>
        {crumb && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground"
          >
            <Link to="/" className="footer-link">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary">{crumb}</span>
          </motion.nav>
        )}
        {action && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}>
            {action}
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="relative"
      >
        <div className="absolute inset-10 -z-10 rounded-full bg-secondary blur-3xl" />
        <motion.img
          src={image}
          alt={imageAlt}
          width={imageSize[0]}
          height={imageSize[1]}
          className="mx-auto w-full max-w-sm md:ml-auto md:mr-0 md:max-w-md"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

export function ConnectButton({ className = "" }: { className?: string }) {
  return (
    <Button asChild size="lg" className={`rounded-full ${className}`}>
      <Link to="/contact-us">
        Connect with us <ArrowUpRight />
      </Link>
    </Button>
  );
}

/** "Brands That Trust Us" logo slides, auto-advancing with manual dots; height is reserved to avoid jumps. */
export function ClientsCarousel() {
  const slides = ["logos-1", "logos-2", "logos-3"];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % slides.length), 4500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="bg-paper py-20 md:py-24">
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

/** Closing "Let's Elevate Your Hiring Strategy Together" band. */
export function HiringCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <DepthSurface className="overflow-hidden rounded-3xl bg-gradient-primary">
        <div className="depth-content grid items-center gap-8 p-8 sm:p-10 md:grid-cols-[1.2fr_1fr] md:p-14">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-4xl leading-tight md:text-5xl"
            >
              Let’s Elevate Your Hiring Strategy Together
            </motion.h2>
            <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full">
              <Link to="/contact-us">
                Connect with us <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <img
            src="/images/cta-person.webp"
            alt="Talentiser consultant ready to help"
            width={661}
            height={480}
            loading="lazy"
            className="mx-auto w-full max-w-sm md:max-w-none"
          />
        </div>
      </DepthSurface>
    </section>
  );
}
