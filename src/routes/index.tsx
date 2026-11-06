import { createFileRoute, Link } from "@tanstack/react-router";
import {
  animate,
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import officeImage from "@/assets/talentiser-office.jpg";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Award } from "lucide-react";
import { TalentNetwork } from "@/components/site/TalentNetwork";
import { DepthSurface } from "@/components/site/DepthSurface";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Talentiser — We Solve Hiring Challenges" },
      {
        name: "description",
        content:
          "Partner with India's leading recruitment firm for Executive Search, GCC hiring, RPO, AcquiHiring, Startup and AI/ML hiring.",
      },
      { property: "og:title", content: "Talentiser — We Solve Hiring Challenges" },
      {
        property: "og:description",
        content: "India's leading recruitment firm. Executive Search, GCC as a Service, RPO and AcquiHiring.",
      },
    ],
  }),
  component: Index,
});

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------- data ---------------- */
const services = [
  { tag: "Flagship", title: "Executive Search", icon: "◆", text: "We identify, engage, and secure transformative senior leaders — CEOs, CTOs, CMOs, CHROs, CFOs — using a proven methodology built for India's most ambitious organisations." },
  { tag: "Specialist", title: "GCC as a Service", icon: "▦", text: "India's most specialised GCC hiring practice. We connect Global Capability Centres with top-tier professionals across tech, finance, R&D, and operations — at scale, with precision." },
  { tag: "Solutions", title: "RPO Solutions", icon: "☰", text: "Transform your hiring process end-to-end. Our Recruitment Process Outsourcing solution embeds our team into yours — driving quality, velocity, and cost efficiency at every stage." },
  { tag: "Ecosystem", title: "AcquiHiring", icon: "⧉", text: "We partner with India's leading acqui-hire ecosystem — devising and executing transformational growth opportunities that bring entire teams and capabilities into your organisation." },
  { tag: "Veterans", title: "Startup Hiring", icon: "➚", text: "Built for speed and scale. We help high-growth startups hire mission-critical talent across product, engineering, GTM, and leadership — without slowing momentum." },
  { tag: "Specialist", title: "AI / ML Hiring", icon: "✺", text: "Access elite AI and machine learning talent — from applied scientists to GenAI engineers. Build, scale, and operationalise AI capabilities with precision hiring." },
];

const stats = [
  { n: 500, s: "+", l: "Client Relationships" },
  { n: 55, s: "+", l: "Acquihiring Deals" },
  { n: 2.5, s: "M+", l: "Candidate Database", d: 1 },
  { n: 50, s: "+", l: "RPO Engagements" },
];

const industries = ["E-commerce", "EduTech", "Fintech / NBFC", "FoodTech", "FMCG", "GCC", "Tech-Logistics", "HealthTech", "SAAS", "Mobility", "Insurance", "Startups", "Manufacturing", "CyberSecurity", "AgriTech", "VC/PE Firms"];

const process = [
  "Need Assessment",
  "Role Definition",
  "Budget & Compensation Benchmarking",
  "Develop an Employee Value Proposition",
  "Establishing Timelines",
  "Recruitment Strategy & Program Management",
  "Continuous Monitoring & Adaption",
];

const testimonials = [
  { name: "Puru Govind", role: "CEO — Brevo / Pushowl", img: "Puru", q: "I have been working with Talentiser for a few years, and they have consistently delivered excellent results for my hiring needs. They are one of the few consultants who truly excel in recruitment for the SaaS industry." },
  { name: "Swati Khanna", role: "VP Talent — PeakXV", img: "Swati", q: "Talentiser team has been a great partner for many young ventures. They specialize in working with startups and quickly build lists of candidates to start engaging with." },
  { name: "Deeksha Bhandari", role: "Accel Partners", img: "deeksha", q: "Partnering with Talentiser for over 8+ years has been a great experience. Their ability to consistently match our portfolios with the right talent at various levels has made a significant impact." },
  { name: "Alankrita", role: "VP Growth & Investments — Lenskart", img: "Aakriti", q: "I've been working with the Talentiser team for the past 5 years and they have helped us acquihire several teams to strengthen product and technology capabilities." },
  { name: "Debleena Das", role: "VP — Z47 (Matrix Partners)", img: "Debleena", q: "Talentiser's persistent performance compounded the status of the firm as a “Go to partner” for Z47 and its portfolio companies since 2017. Onwards and upwards!" },
  { name: "Aditya Chatterjee", role: "HR Head — Adda247", img: "Aditya", q: "They consistently provide top-tier candidates, both in tech and non-tech roles. Their professionalism and efficiency is unmatched." },
  { name: "Gaurav Kriplani", role: "Head of People — MPL", img: "MPL", q: "Never a position that has not been closed for us by Talentiser. They are invariably the first call whenever a critical mandate comes up." },
  { name: "Astha Chandok", role: "TA Head — Prime Venture Partners", img: "Astha", q: "Ravi and his team consistently go the extra mile, showing dedication and strong connections. They work hard and deliver results when it matters." },
  { name: "Jitender Panihar", role: "CHRO — MoEngage", img: "JItendar", q: "Their team consistently delivers high-quality candidates who not only meet the technical requirements but also align with our company culture and values." },
  { name: "Sudhanshu Verma", role: "VP HR — Anand Rathi", img: "Sudhanshu", q: "I highly recommend Talentiser to any organization looking for a recruitment partner that truly understands the complexities of talent acquisition." },
];

const faqs = [
  { q: "What services does Talentiser provide?", a: "We specialize in both Tech and Business Hiring, helping companies find top talent across various industries. Talentiser provides Leadership Hiring, RPO, AcquiHiring and Diversity Hiring services." },
  { q: "What industries does Talentiser serve?", a: "E-commerce, EduTech, Fintech/NBFC, FoodTech, FMCG, GCC, Tech-Logistics, HealthTech, SAAS, Mobility, Insurance, Startups, Manufacturing, CyberSecurity, AgriTech, VC/PE Firms and many more." },
  { q: "What sets Talentiser apart from other recruitment firms?", a: "Our personalized approach, industry expertise, and commitment to long-term partnerships. We focus on understanding your unique business needs and providing tailor-made recruitment solutions." },
  { q: "How does Talentiser ensure the quality of candidates?", a: "Rigorous screening, interviewing, and skills assessments. We understand your culture and values, ensuring every candidate is a strong fit for both the role and your team." },
  { q: "What types of roles can Talentiser help fill?", a: "A wide range of positions, from mid-level to executive roles, in both technical and non-technical fields." },
];

const blogs = [
  { t: "Why Your Resume Is Getting Rejected Even When You Meet the Job Requirements", d: "November 2, 2026", img: "/images/blog-1.webp", href: "https://talentiser.com/hiring/why-your-resume-is-getting-rejected/" },
  { t: "The AI Hiring Surge: Why Companies Are Racing to Secure Talent", d: "October 13, 2026", img: "/images/blog-2.png", href: "https://talentiser.com/hiring/tech-ai-ml/ai-hiring-surge/" },
  { t: "The Startup Org Chart Is Dead. What Comes Next?", d: "October 5, 2026", img: "/images/blog-3.png", href: "https://talentiser.com/startup/startup-organisational-structure-future/" },
];

/* ---------------- helpers ---------------- */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SplitWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  return (
    <span ref={ref} className={className.replace("text-gradient", "text-primary")}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 align-bottom [perspective:600px]">
          <motion.span
            className="inline-block origin-bottom"
            initial={reduced ? false : { y: "110%", rotateX: -65 }}
            animate={inView ? { y: 0, rotateX: 0, rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function SplitChars({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`block [perspective:800px] ${className}`} aria-label={text}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block origin-bottom [transform-style:preserve-3d]"
          initial={reduce ? false : { opacity: 0, y: "60%", rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease }}
        >
          {c === " " ? "\u00a0" : c}
        </motion.span>
      ))}
    </span>
  );
}

function Parallax({ children, offset = 80, className = "" }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const reduced = useReducedMotion();
  return <motion.div ref={ref} style={reduced ? {} : { y }} className={className}>{children}</motion.div>;
}

function Counter({ to, suffix, decimals = 0 }: { to: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: "easeOut", onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Magnetic({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="eyebrow flex items-center gap-3">
        <span className="h-px w-10 bg-primary" />
        {children}
      </p>
    </Reveal>
  );
}

/* ---------------- sections ---------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-primary" />;
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        if (reduceMotion) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="hero-scene relative isolate overflow-hidden"
    >
      <motion.img style={reduceMotion ? {} : { y: imgY, scale: imgScale }} src={officeImage} alt="Professionals collaborating in a contemporary office" width={1920} height={1024} fetchPriority="high" className="hero-photo absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="hero-wash absolute inset-0 -z-10" />
      <TalentNetwork />
      <motion.div style={reduceMotion ? {} : { y: textY, opacity: textOpacity }} className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 md:pb-20 md:pt-44">
        <motion.p initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8 flex max-w-lg items-center gap-3 text-xs font-semibold text-muted-foreground">
          <Award className="h-5 w-5 shrink-0 text-primary" />
          Winner — “Best Talent Acquisition Team” by LinkedIn India
        </motion.p>
        <p className="mb-5 text-sm font-bold uppercase text-primary">Talentiser</p>
        <div className="[perspective:1200px]">
          <motion.h1 style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="hero-headline font-light">
            <SplitChars text="We Solve" delay={0.1} />
            <SplitChars text="Hiring" delay={0.4} className="italic text-primary" />
            <span className="block [perspective:800px]">
              <SplitChars text="Challenges" delay={0.6} className="!inline" />
              <motion.span initial={reduceMotion ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: "spring", stiffness: 300 }} className="inline-block text-accent">.</motion.span>
            </span>
          </motion.h1>
        </div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="mt-7">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">Partner with India's leading recruitment firm to build strong teams of leaders, GCC specialists, and AI talent.</p>
          <Magnetic>
            <Button asChild size="lg" className="mt-7 h-12 rounded-full px-6">
              <Link to="/contact">Connect with us <ArrowUpRight /></Link>
            </Button>
          </Magnetic>
        </motion.div>
        <div className="mt-10 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
          <span className="h-px w-12 bg-accent" />
          Executive Search · GCC · RPO
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);
  const words = ["Executive Search", "GCC as a Service", "RPO", "AcquiHiring", "Startup Hiring", "AI / ML Hiring"];
  return (
    <div className="relative -rotate-2 border-y bg-gradient-primary py-5 text-primary-foreground">
      <motion.div ref={ref} style={{ x }}><div className="flex w-max marquee">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-8 px-8 font-display text-3xl italic">
            {w} <span className="text-xl not-italic">✦</span>
          </span>
        ))}
      </div></motion.div>
    </div>
  );
}

function TiltCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  return (
    <Reveal delay={(i % 3) * 0.1} className="h-full">
      <DepthSurface className="group rounded-lg border bg-card p-7 md:p-8">
        <div className="depth-content">
          <div className="flex items-start justify-between">
            <div className="depth-icon grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-[-6deg]">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <span className="text-[10px] font-bold uppercase text-primary">{s.tag}</span>
          </div>
          <p className="mt-8 font-display text-sm text-muted-foreground">0{i + 1}</p>
          <h3 className="mt-1 text-3xl">{s.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          <Button asChild variant="link" className="mt-6 h-auto p-0 text-xs font-bold uppercase">
            <Link to="/services">Explore <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
          </Button>
        </div>
      </DepthSurface>
    </Reveal>
  );
}

function Services() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32">
      <Eyebrow>What we do</Eyebrow>
      <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="text-5xl md:text-7xl">
          <SplitWords text="Four Practices." /> <span className="italic text-gradient"><SplitWords text="One Obsession." delay={0.2} /></span>
        </h2>
        <Reveal delay={0.3}>
          <p className="text-muted-foreground">
            From placing a transformative CXO to building an entire GCC workforce from scratch — Talentiser moves with precision, speed, and deep industry context.
          </p>
        </Reveal>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <TiltCard key={s.title} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative overflow-hidden bg-paper py-32 text-paper-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">About us</p>
          <h2 className="mt-4 max-w-2xl text-5xl md:text-6xl"><SplitWords text="Benefits of collaborating with us" /></h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-px bg-paper-foreground/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1} className="bg-paper p-5 sm:p-8">
              <motion.div initial={{ rotateY: -70, opacity: 0 }} whileInView={{ rotateY: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.12, ease }} whileHover={{ y: -6, rotateX: 8 }} style={{ transformPerspective: 900 }}>
                <p className="font-display text-5xl font-light sm:text-6xl lg:text-7xl">
                  <Counter to={s.n} suffix={s.s} decimals={s.d ?? 0} />
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-widest opacity-60">{s.l}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-12 flex flex-col items-start gap-6 rounded-3xl border border-paper-foreground/10 p-8 md:flex-row md:items-center">
          <img
            src={"/images/award.jpg"}
            alt="LinkedIn India Best Talent Acquisition Team award"
            className="h-24 w-24 rounded-2xl object-cover"
            loading="lazy"
          />
          <p className="font-display text-2xl md:text-3xl">
            Winner of <span className="italic">“Best Talent Acquisition Team”</span> Award by LinkedIn India
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Clients() {
  const logos = ["logos-1", "logos-2", "logos-3"];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Eyebrow>Our clients</Eyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl">
          <SplitWords text="Brands That Trust Us" />
        </h2>
      </div>
      <div className="mt-12 space-y-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        {[false, true].map((rev) => (
          <div key={String(rev)} className={`flex w-max gap-6 ${rev ? "marquee-reverse" : "marquee"}`}>
            {[...logos, ...logos, ...logos, ...logos].map((l, i) => (
              <div key={i} className="rounded-2xl bg-paper px-6 py-4">
                <img src={`/images/${l}.png`} alt="Client logos" className="h-14 w-auto max-w-none" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <Eyebrow>Industries</Eyebrow>
      <h2 className="mt-6 max-w-3xl text-5xl md:text-6xl">
        <SplitWords text="Collaborated with diverse industries to hire" /> <span className="italic text-gradient">top talent</span>
      </h2>
      <div className="mt-14 flex flex-wrap gap-3">
        {industries.map((ind, i) => (
          <motion.span
            key={ind}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 14 }}
            whileHover={{ scale: 1.1, rotate: -2 }}
            className="cursor-default rounded-full border bg-card px-6 py-3 text-lg font-semibold transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            {ind}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
        <div className="md:sticky md:top-32 md:self-start">
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-6 text-5xl md:text-6xl">
            <SplitWords text="Our Recruitment" /> <span className="italic text-gradient"><SplitWords text="Process" delay={0.2} /></span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted-foreground">Seven deliberate steps that turn a hiring need into a high-performing team.</p>
          </Reveal>
        </div>
        <div ref={ref} className="relative pl-10">
          <div className="absolute left-3 top-0 h-full w-px bg-border" />
          <motion.div style={{ height: h }} className="absolute left-3 top-0 w-px bg-gradient-primary" />
          {process.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: 60, rotateY: -35 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              style={{ transformPerspective: 1000, transformOrigin: "left center" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="group relative mb-6 rounded-lg border bg-card p-6 shadow-glow transition-colors hover:border-primary"
            >
              <span className="absolute -left-[34px] top-8 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              <p className="font-display text-5xl font-light text-muted-foreground transition-colors group-hover:text-primary">0{i + 1}</p>
              <h3 className="mt-2 text-2xl">{p}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i] ?? testimonials[0];
  if (!t) return null;
  return (
    <section className="grain relative overflow-hidden border-y bg-card py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Eyebrow>Testimonials</Eyebrow>
        <h2 className="mt-6 text-5xl md:text-6xl">Our Happy Clients</h2>
        <div className="relative mt-14 min-h-[320px]">
          <span className="absolute -left-4 -top-16 font-display text-[12rem] leading-none text-primary/20">“</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateX: -12, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 12, y: -20 }}
              style={{ transformPerspective: 1200 }}
              transition={{ duration: 0.7, ease }}
              className="relative"
            >
              <p className="font-display text-2xl font-light leading-snug md:text-4xl">{t.q}</p>
              <div className="mt-10 flex items-center gap-4">
                <img src={`/images/t-${t.img}.png`} alt={t.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-primary" />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex gap-2">
          {testimonials.map((_, k) => (
            <button key={k} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
              {k === i && (
                <motion.span
                  className="block h-full bg-gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
              {k < i && <span className="block h-full bg-primary/60" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-32">
      <Eyebrow>Questions</Eyebrow>
      <h2 className="mt-6 text-5xl md:text-6xl">Frequently Asked Questions</h2>
      <div className="mt-12 divide-y border-y">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
              <span className="font-display text-xl md:text-2xl">{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border text-xl text-primary"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                  <p className="pb-6 text-muted-foreground">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Eyebrow>Blogs</Eyebrow>
          <h2 className="mt-6 text-5xl md:text-6xl">Latest From Our Blog</h2>
        </div>
        <Link to="/blog" className="hidden text-sm font-bold uppercase tracking-widest text-primary md:block">
          View all posts →
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {blogs.map((b, i) => (
          <Reveal key={b.t} delay={i * 0.12}>
            <DepthSurface className="rounded-lg bg-card pb-6">
            <a href={b.href} target="_blank" rel="noreferrer" className="group block">
              <div className="overflow-hidden rounded-t-lg">
                <img src={b.img} alt={b.t} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <p className="mx-5 mt-5 text-xs uppercase text-muted-foreground">Valentina · {b.d}</p>
              <h3 className="mx-5 mt-2 text-xl leading-snug transition-colors group-hover:text-primary">{b.t}</h3>
            </a>
            </DepthSurface>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative overflow-hidden border-t bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-5xl font-light leading-tight md:text-7xl">Let’s Elevate Your <span className="italic">Hiring Strategy</span> Together.</h2>
          <div className="mt-10">
            <Magnetic>
              <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-8">
                <a href="https://talentiser.com/contact-us/">Connect with us <ArrowUpRight /></a>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <MotionConfig reducedMotion="user">
    <main className="relative overflow-x-clip">
      <ScrollProgress />
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Clients />
      <Industries />
      <Process />
      <Testimonials />
      <Faq />
      <Blog />
      <Cta />
    </main>
    <Footer />
    </MotionConfig>
  );
}
