import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact — Talentiser" },
      { name: "description", content: "Contact at Talentiser, India's leading recruitment firm." },
      { property: "og:title", content: "Contact — Talentiser" },
      { property: "og:description", content: "Contact at Talentiser, India's leading recruitment firm." },
    ],
  }),
  component: () => <ComingSoon title="Contact" />,
});
