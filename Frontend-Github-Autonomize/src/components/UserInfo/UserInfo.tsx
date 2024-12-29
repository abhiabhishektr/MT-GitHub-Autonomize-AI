import React from "react";
import { useGitHub } from "../../context/GitHubContext";
import './styles.css';

interface UserInfoProps {
  setActiveTab: (tab: "repositories" | "followers") => void;
  activeTab: "repositories" | "followers";
}

const UserInfo: React.FC<UserInfoProps> = ({ setActiveTab, activeTab }) => {
  const { currentUser } = useGitHub();

  if (!currentUser) return null;

  return (
    <div className="user-info-container">
      <div className="user-info-header">
        <img src={currentUser.avatar_url} alt={currentUser.name} className="user-avatar" />
        <h2 className="user-name">{currentUser.name}</h2>
        {currentUser.location && <p className="user-location">{currentUser.location}</p>}
      </div>
      {currentUser.bio && <p className="user-bio">{currentUser.bio}</p>}

      <div className="user-info-details">
        <span className="info-label">Followers:</span>
        <span className="info-value">{currentUser.followers}</span>
        <span className="info-label">Following:</span>
        <span className="info-value">{currentUser.following}</span>
      </div>

      <div className="user-info-tabs">
        <button
          className={`tab-button ${activeTab === "repositories" ? "active" : ""}`}
          onClick={() => setActiveTab("repositories")}
        >
          Repositories
        </button>
        <button
          className={`tab-button ${activeTab === "followers" ? "active" : ""}`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
