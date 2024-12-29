import React, { useEffect, useState } from "react";
import { Repository, useGitHub } from "../../context/GitHubContext";
import { SAMPLE_REPOSITORIES } from "../../constants/sampleRepositories";
import './styles.css';


const RepositoryList: React.FC = () => {
  const { currentUser, fetchRepositories } = useGitHub();
  const [repos, setRepos] = useState<Repository[]>(SAMPLE_REPOSITORIES);

  useEffect(() => {
    if (currentUser) {
      fetchRepositories(currentUser.login).then(setRepos);
    }
  }, [currentUser]);

  if (!repos.length) return <p>No repositories found.</p>;

  return (
    <div className="repository-grid">
      {repos.map((repo) => (
        <div className="repository-item" key={repo.id}>
          <div className="icon"></div>
          <div className="content">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description || "No description available"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
