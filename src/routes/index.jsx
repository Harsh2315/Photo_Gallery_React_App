import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "../components/Gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Photo Gallery",
      },
      {
        name: "description",
        content: "Browse and favourite photos from Picsum.",
      },
    ],
  }),
  component: Gallery,
});