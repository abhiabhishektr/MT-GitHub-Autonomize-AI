// src/components/UserInfo.tsx
import React from "react";
import { useGitHub } from "../context/GitHubContext";

const UserInfo: React.FC = () => {
  const { currentUser } = useGitHub();

  if (!currentUser) return null;

  return (
    <div>
      <img src={currentUser.avatar_url} alt={currentUser.name} />
      <h2>{currentUser.name}</h2>
      <p>{currentUser.bio}</p>
      <p>Location: {currentUser.location}</p>
    </div>
  );
};

export default UserInfo;