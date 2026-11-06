import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Services — Talentiser" },
      { name: "description", content: "Services at Talentiser, India's leading recruitment firm." },
      { property: "og:title", content: "Services — Talentiser" },
      { property: "og:description", content: "Services at Talentiser, India's leading recruitment firm." },
    ],
  }),
  component: () => <ComingSoon title="Services" />,
});
