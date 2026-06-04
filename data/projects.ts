export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "the-bridge",
    title: "The Bridge",
    description: "A communication platform bridging the emotional gap between college students and their parents through low-pressure interactions.",
    thumbnail: "/images/the_bridge/03 high.png",
    tags: ["UX Research", "UI Design", "Case Study"]
  },
  {
    id: "makers-loop",
    title: "Makers Loop",
    description: "A collaborative platform for makers and designers to share and iterate on physical prototypes.",
    thumbnail: "/images/makers_loop/图片4.png",
    tags: ["Product Design", "Prototyping", "UX Design"]
  },
  {
    id: "remind-me",
    title: "RemindME",
    description: "An intelligent travel-time reminder system that automates departure calculations by integrating Google Calendar and Maps APIs.",
    thumbnail: "/images/remindme/demo.gif",
    tags: ["Full-stack", "API Integration", "Productivity Tool"]
  },
  {
    id: "museum-of-glass",
    title: "Museum of Glass",
    description: "A comprehensive branding and digital artifact exploration for the Museum of Glass, focusing on typography, color systems, and modern web interfaces.",
    thumbnail: "/images/museum_of_glass/digital-artifact.png",
    tags: ["Branding", "UI/UX Design", "Case Study"]
  },
  {
    id: "project-1",
    title: "Example Project 1",
    description: "A description of the first example project.",
    thumbnail: "/images/project-1-thumb.jpg",
    tags: ["UX Research", "UI Design"]
  },
  {
    id: "project-2",
    title: "Example Project 2",
    description: "A description of the second example project.",
    thumbnail: "/images/project-2-thumb.jpg",
    tags: ["Interaction Design", "Prototyping"]
  }
];
