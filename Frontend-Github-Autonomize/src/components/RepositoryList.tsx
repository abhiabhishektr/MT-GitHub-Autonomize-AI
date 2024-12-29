// src/components/RepositoryList.tsx                

import React, { useEffect, useState } from "react";
import { useGitHub } from "../context/GitHubContext";

interface Repository {
  id: number;
  name: string;
  html_url: string;
}

const RepositoryList: React.FC = () => {
  const { currentUser, fetchRepositories } = useGitHub();
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    if (currentUser) {
      fetchRepositories(currentUser.login).then(setRepos);
    }
  }, [currentUser]);

  if (!repos.length) return <p>No repositories found.</p>;

  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default RepositoryList;
