export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  zh: Pick<Project, 'title' | 'description' | 'tags'>;
}

export const projects: Project[] = [
  {
    id: "the-bridge",
    title: "The Bridge",
    description: "A communication platform bridging the emotional gap between college students and their parents through low-pressure interactions.",
    thumbnail: "/images/the_bridge/03 high.png",
    tags: ["UX Research", "UI Design", "Case Study"],
    zh: { title: '心桥', description: '一个通过低压力互动，帮助大学生与父母跨越情感距离的沟通平台。', tags: ['用户体验研究', '界面设计', '案例研究'] }
  },
  {
    id: "makers-loop",
    title: "Makers Loop",
    description: "A collaborative platform for makers and designers to share and iterate on physical prototypes.",
    thumbnail: "/images/makers_loop/图片4.png",
    tags: ["Product Design", "Prototyping", "UX Design"],
    zh: { title: '创客循环', description: '一个供创客与设计师分享并迭代实体原型的协作平台。', tags: ['产品设计', '原型制作', '用户体验设计'] }
  },
  {
    id: "remind-me",
    title: "RemindME",
    description: "An intelligent travel-time reminder system that automates departure calculations by integrating Google Calendar and Maps APIs.",
    thumbnail: "/images/remindme/demo.gif",
    tags: ["Full-stack", "API Integration", "Productivity Tool"],
    zh: { title: 'RemindME', description: '一个整合 Google 日历与地图 API、自动计算出发时间的智能行程提醒系统。', tags: ['全栈开发', 'API 集成', '效率工具'] }
  },
  {
    id: "museum-of-glass",
    title: "Museum of Glass",
    description: "A comprehensive branding and digital artifact exploration for the Museum of Glass, focusing on typography, color systems, and modern web interfaces.",
    thumbnail: "/images/museum_of_glass/digital-artifact.png",
    tags: ["Branding", "UI/UX Design", "Case Study"],
    zh: { title: '玻璃博物馆', description: '为玻璃博物馆打造的品牌与数字作品探索项目，聚焦字体、色彩系统与现代网页界面。', tags: ['品牌设计', '界面与体验设计', '案例研究'] }
  },
  {
    id: "project-1",
    title: "Example Project 1",
    description: "A description of the first example project.",
    thumbnail: "/images/project-1-thumb.jpg",
    tags: ["UX Research", "UI Design"],
    zh: { title: '示例项目 1', description: '第一个示例项目的介绍。', tags: ['用户体验研究', '界面设计'] }
  },
  {
    id: "project-2",
    title: "Example Project 2",
    description: "A description of the second example project.",
    thumbnail: "/images/project-2-thumb.jpg",
    tags: ["Interaction Design", "Prototyping"],
    zh: { title: '示例项目 2', description: '第二个示例项目的介绍。', tags: ['交互设计', '原型制作'] }
  }
];
