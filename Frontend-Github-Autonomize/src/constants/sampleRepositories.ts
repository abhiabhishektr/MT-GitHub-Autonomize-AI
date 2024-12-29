import { Repository } from "../context/GitHubContext";

export const SAMPLE_REPOSITORIES: Repository[] = [
  {
    id: 101,
    name: "awesome-project",
    avatar_url: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "An awesome project to showcase cool features.",
     html_url: "https://github.com/user/node-api",
  },
  {
    id: 102,
    name: "portfolio-website",
    avatar_url: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "A personal portfolio website built using React.",
     html_url: "https://github.com/user/node-api",
  },
  {
    id: 103,
    name: "react-components",
    avatar_url: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "Reusable React components for your projects.",
     html_url: "https://github.com/user/node-api",
  },
  {
    id: 104,
    name: "node-api",
    avatar_url: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "A RESTful API built with Node.js and Express.",
     html_url: "https://github.com/user/node-api",
  },
  {
    id: 105,
    name: "machine-learning",
    avatar_url: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "Basic machine learning algorithms implemented in Python.",
     html_url: "https://github.com/user/node-api",
  },
];
