import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About — Talentiser" },
      { name: "description", content: "About at Talentiser, India's leading recruitment firm." },
      { property: "og:title", content: "About — Talentiser" },
      { property: "og:description", content: "About at Talentiser, India's leading recruitment firm." },
    ],
  }),
  component: () => <ComingSoon title="About" />,
});
