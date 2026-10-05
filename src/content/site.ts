export type SocialLink = {
  label: string;
  href: `https://${string}` | `mailto:${string}`;
};

export type CurrentlyItem = {
  label: "Building" | "Reading" | "Running";
  value: string;
};

type SiteContent = {
  name: string;
  shortName: string;
  url: `https://${string}`;
  description: string;
  introduction: string;
  socialLinks: readonly SocialLink[];
  currently: readonly CurrentlyItem[];
};

export const site = {
  name: "Rishabh Tamhane",
  shortName: "RT",
  url: "https://rishabhtamhane.com",
  description:
    "Projects, technical explorations, things I’m learning, and life beyond software.",
  introduction:
    "Software engineer. Code, side projects, and whatever I’m curious about next.",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/rishabh-tamhane",
    },
  ],
  currently: [
    {
      label: "Building",
      value: "An expense splitter and a self-hosted photo library.",
    },
    {
      label: "Reading",
      value: "Atomic Habits — getting a little better every day.",
    },
    {
      label: "Running",
      value: "More consistently than quickly.",
    },
  ],
} as const satisfies SiteContent;
