import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function ComingSoon({ title }: { title: string }) {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div className="grid-lines absolute inset-0" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative text-center">
        <p className="eyebrow">Coming soon</p>
        <h1 className="mt-4 text-6xl md:text-8xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">This page is being crafted. Check back shortly.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground">
          Back home
        </Link>
      </motion.div>
    </section>
  );
}
