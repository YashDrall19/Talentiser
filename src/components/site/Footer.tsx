import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const practices = ["Executive Search", "GCC as a Service", "RPO Solutions", "AcquiHiring", "Startup Hiring", "AI / ML Hiring"];
const offices = [
  { city: "Bengaluru", address: "We Work, Prestige Atlanta, 80 Feet Road, Koramangala 1A Block, Bengaluru, Karnataka 560034" },
  { city: "Gurugram", address: "91 Springboard Augusta Point, Golf Course Road, Gurugram" },
  { city: "Noida", address: "Amigo, C25, C Block, Ground Floor, Sector 8, Noida, Uttar Pradesh 201301" },
];

export function Footer() {
  return (
    <footer className="site-footer border-t bg-paper text-paper-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Talentiser home">
              <span className="footer-monogram grid h-11 w-11 place-items-center rounded-full bg-primary font-display text-2xl text-primary-foreground">T</span>
              <span className="font-display text-4xl">Talentiser</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">Connecting ambitious companies with exceptional talent. Recruitment solutions for mid-size businesses, large enterprises, and high-growth startups.</p>
            <div className="mt-7 flex items-center gap-3">
              <Button asChild variant="outline" size="icon" className="rounded-full" title="Talentiser on LinkedIn">
                <a href="https://www.linkedin.com/company/talentiser/" target="_blank" rel="noopener noreferrer" aria-label="Talentiser on LinkedIn"><Linkedin /></a>
              </Button>
              <span className="text-xs text-muted-foreground">People. Partnerships. Possibilities.</span>
            </div>
          </div>
          <nav aria-label="Footer services">
            <h2 className="font-sans text-xs font-bold uppercase text-primary">Our expertise</h2>
            <ul className="mt-6 space-y-3">
              {practices.map((practice) => <li key={practice}><a className="footer-link text-sm" href="https://talentiser.com/services/">{practice}<ArrowUpRight className="h-3.5 w-3.5" /></a></li>)}
            </ul>
          </nav>
          <div>
            <h2 className="font-sans text-xs font-bold uppercase text-primary">Let’s connect</h2>
            <a className="footer-link mt-6 flex items-center gap-3 break-all text-sm" href="mailto:support@talentiser.com"><Mail className="h-4 w-4 shrink-0" />support@talentiser.com</a>
            <a className="footer-link mt-4 flex items-center gap-3 text-sm" href="tel:+917291991368"><Phone className="h-4 w-4 shrink-0" />+91 7291991368</a>
            <nav aria-label="Footer company" className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <Link to="/about" className="footer-link">About us</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
              <a href="https://talentiser.com/contact-us/" className="footer-link">Contact us</a>
            </nav>
          </div>
        </div>
        <div className="grid gap-8 border-t py-10 md:grid-cols-3">
          {offices.map((office) => (
            <address key={office.city} className="not-italic">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`} target="_blank" rel="noopener noreferrer" className="footer-link inline-flex items-center gap-2 font-semibold text-sm"><MapPin className="h-4 w-4 text-primary" />{office.city}<ArrowUpRight className="h-3.5 w-3.5" /></a>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">{office.address}</p>
            </address>
          ))}
        </div>
        <div className="flex flex-col gap-5 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Talentiser. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://talentiser.com/privacy-policy/" className="footer-link">Privacy policy</a>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><ArrowUp /></Button>
          </div>
        </div>
      </div>
    </footer>
  );
}