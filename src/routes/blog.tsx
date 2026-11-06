import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Blog — Talentiser" },
      { name: "description", content: "Blog at Talentiser, India's leading recruitment firm." },
      { property: "og:title", content: "Blog — Talentiser" },
      { property: "og:description", content: "Blog at Talentiser, India's leading recruitment firm." },
    ],
  }),
  component: () => <ComingSoon title="Blog" />,
});
