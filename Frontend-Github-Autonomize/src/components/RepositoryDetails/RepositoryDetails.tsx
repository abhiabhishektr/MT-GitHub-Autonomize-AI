// src/components/RepositoryDetails.tsx

import React, { useEffect, useState } from "react";
import { useGitHub } from "../../context/GitHubContext";

interface Repository {
  description: string;
  html_url: string;
  name: string;
}

interface RepositoryDetailsProps {
  repoName: string;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({ repoName }) => {
  const { currentUser, fetchRepositories } = useGitHub();
  const [repoDetails, setRepoDetails] = useState<Repository | null>(null);

  useEffect(() => {
    if (currentUser) {
      fetchRepositories(currentUser.login).then((repos) => {
        const repo = repos.find((r) => r.name === repoName);
        setRepoDetails(repo || null);
      });
    }
  }, [currentUser, repoName]);

  if (!repoDetails) return <p>Repository details not found.</p>;

  return (
    <div>
      <h2>{repoDetails.name}</h2>
      <p>{repoDetails.description}</p>
      <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default RepositoryDetails;
