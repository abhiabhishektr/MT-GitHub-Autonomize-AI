import React, { useEffect, useState } from "react";
import { Repository, useGitHub } from "../../context/GitHubContext";
import { SAMPLE_REPOSITORIES } from "../../constants/sampleRepositories";
import './styles.css';

const RepositoryList: React.FC = () => {
    const { currentUser, fetchRepositories } = useGitHub();
    const [repos, setRepos] = useState<Repository[]>(SAMPLE_REPOSITORIES);
    const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

    useEffect(() => {
        if (currentUser) {
            fetchRepositories(currentUser.login).then(setRepos);
        }
    }, [currentUser]);

    const handleRepoClick = (repo: Repository) => {
        setSelectedRepo(repo);
    };

    const handleBackClick = () => {
        setSelectedRepo(null);
    };

    if (!repos.length) return <p>No repositories found.</p>;

    return (
        <div className="repositories-container">
            {selectedRepo ? (
                <div className="repo-details">
                    <div className="repo-details-header">
                        <button className="back-button" onClick={handleBackClick}>
                            ← Back to Repositories
                        </button>
                        <div className="content-with-avatar">
                            <img
                                src={currentUser?.avatar_url}
                                alt={`${currentUser?.name || 'User'} avatar`}
                                className="user-avatar"
                            />
                            <div className="repo-header-content">
                                <h2>{selectedRepo.name}</h2>
                                <p className="repo-description">{selectedRepo.description || "No description available"}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="repo-stats">
                        <div className="stat-item">
                            <span className="stat-label">Language</span>
                            <span className="stat-value">{selectedRepo.language || 'Not specified'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Stars</span>
                            <span className="stat-value">{selectedRepo.stargazers_count || 0}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Forks</span>
                            <span className="stat-value">{selectedRepo.forks_count || 0}</span>
                        </div>
                    </div>

                    <div className="repo-actions">
                        <a 
                            href={selectedRepo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="primary-action"
                        >
                            View on GitHub
                        </a>
                        {/* <a 
                            href={`${selectedRepo.html_url}/issues`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="secondary-action"
                        >
                            View Issues
                        </a> */}
                    </div>
                </div>
            ) : (
                <div className="repository-grid">
                    {repos.map((repo) => (
                        <div
                            className="repository-item"
                            key={repo.id}
                            onClick={() => handleRepoClick(repo)}
                        >
                            <img
                                src={currentUser?.avatar_url}
                                alt={`${currentUser?.name || 'User'} avatar`}
                                className="repo-avatar"
                            />
                            <div className="content">
                                <span className="repo-link">
                                    {repo.name}
                                    <span className="checkmark">✓</span>
                                </span>
                                <p>{repo.description || "No description available"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RepositoryList;