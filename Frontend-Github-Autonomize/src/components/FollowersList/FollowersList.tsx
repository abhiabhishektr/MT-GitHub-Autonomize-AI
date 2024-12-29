// src/components/FollowersList.tsx

import React, { useEffect, useState } from "react";
import { useGitHub } from "../../context/GitHubContext";

interface Follower {
  id: number;
  login: string;
  avatar_url: string;
}

const FollowersList: React.FC = () => {
  const { currentUser, fetchFollowers, fetchUserInfo, setCurrentUser } = useGitHub();
  const [followers, setFollowers] = useState<Follower[]>([]);

  useEffect(() => {
    if (currentUser) {
      fetchFollowers(currentUser.login).then(setFollowers);
    }
  }, [currentUser]);

  if (!followers.length) return <p>No followers found.</p>;

  return (
    <ul>
      {followers.map((follower) => (
        <li key={follower.id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              fetchUserInfo(follower.login).then(setCurrentUser);
            }}
          >
            {follower.login}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FollowersList;
