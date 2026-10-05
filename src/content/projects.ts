type ExternalUrl = `https://${string}`;

type ProjectDestination =
  | {
      githubUrl: ExternalUrl;
      liveUrl?: ExternalUrl;
    }
  | {
      githubUrl?: ExternalUrl;
      liveUrl: ExternalUrl;
    };

export type Project = {
  name: string;
  description: string;
  topics: readonly string[];
  featured: boolean;
} & ProjectDestination;

// The Project type prevents a future entry from omitting both destinations.
export const projects: readonly Project[] = [
  {
    name: "Checkmate",
    description:
      "A web app for splitting restaurant receipts by the items each person consumed, with editable review, cent-exact allocation, and PDF export.",
    topics: ["Python", "FastAPI", "OpenAI", "PDF"],
    githubUrl: "https://github.com/rishabh-tamhane/checkmate",
    featured: true,
  },
];

export function getFeaturedProjects(): readonly Project[] {
  return projects.filter((project) => project.featured);
}
