export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export const projects: Project[] = [
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
