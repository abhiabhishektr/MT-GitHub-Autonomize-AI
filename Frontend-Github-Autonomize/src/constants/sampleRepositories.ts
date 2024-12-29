import { Repository } from "../context/GitHubContext";

export const SAMPLE_REPOSITORIES: Repository[] = [
  {
    id: 101,
    name: "awesome-project",
    html_url: "https://github.com/user/awesome-project",
    description: "An awesome project to showcase cool features.",
  },
  {
    id: 102,
    name: "portfolio-website",
    html_url: "https://github.com/user/portfolio-website",
    description: "A personal portfolio website built using React.",
  },
  {
    id: 103,
    name: "react-components",
    html_url: "https://github.com/user/react-components",
    description: "Reusable React components for your projects.",
  },
  {
    id: 104,
    name: "node-api",
    html_url: "https://github.com/user/node-api",
    description: "A RESTful API built with Node.js and Express.",
  },
  {
    id: 105,
    name: "machine-learning",
    html_url: "https://github.com/user/machine-learning",
    description: "Basic machine learning algorithms implemented in Python.",
  },
];
