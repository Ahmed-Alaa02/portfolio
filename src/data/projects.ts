export type ProjectData = {
  id: number;
  titleKey: "ketanSchool" | "gym818" | "lmsDashboard" | "taskr";
  tech: string[];
  liveUrl: string;
  images: string[];
  isRequestDemoDashboard?: boolean;
  isRequestDemoTaskr?: boolean;
};

export const projectsData: ProjectData[] = [
  {
    id: 1,
    titleKey: "ketanSchool",
    tech: ["Laravel", "PHP", "MySQL", "API", "JavaScript", "Bootstrap"],
    liveUrl: "https://lms.cyberface-solutions.com/",
    images: [
      "/images/projects/ketan-school/1.PNG",
      "/images/projects/ketan-school/2.PNG",
      "/images/projects/ketan-school/3.PNG",
    ],
  },
  {
    id: 2,
    titleKey: "gym818",
    tech: ["Wordpress", "Elementor", "Plugins", "Custom CSS", "Custom JS"],
    liveUrl: "https://818.ae/",
    images: [
      "/images/projects/818-gym/img1.PNG",
      "/images/projects/818-gym/img2.PNG",
      "/images/projects/818-gym/img3.PNG",
      "/images/projects/818-gym/img4.PNG",
    ],
  },
  {
    id: 3,
    titleKey: "lmsDashboard",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "Breeze"],
    liveUrl: "#contact",
    isRequestDemoDashboard: true,
    images: [
      "/images/projects/lms-dashboard/1.PNG",
      "/images/projects/lms-dashboard/2.PNG",
      "/images/projects/lms-dashboard/3.PNG",
      "/images/projects/lms-dashboard/4.PNG",
    ],
  },
  /* Re-enable TASKR when needed:
  {
    id: 4,
    titleKey: "taskr",
    tech: ["PHP", "MySQL", "HTML 5", "CSS", "JavaScript", "Bootstrap"],
    liveUrl: "#contact",
    isRequestDemoTaskr: true,
    images: [
      "/images/projects/taskr-app/1.PNG",
      "/images/projects/taskr-app/2.PNG",
      "/images/projects/taskr-app/3.PNG",
      "/images/projects/taskr-app/4.PNG",
    ],
  },
  */
];
