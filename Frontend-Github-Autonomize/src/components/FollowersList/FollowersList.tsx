import React, { useEffect, useState } from "react";
import { Follower, useGitHub } from "../../context/GitHubContext";
import { SAMPLE_FOLLOWERS } from "../../constants/sampleFollowers";
import './styles.css'

const FollowersList: React.FC = () => {
    const { currentUser, fetchFollowers, fetchUserInfo, setCurrentUser } = useGitHub();
    const [followers, setFollowers] = useState<Follower[]>(SAMPLE_FOLLOWERS);

    useEffect(() => {
        if (currentUser) {
            fetchFollowers(currentUser.login).then(setFollowers);
        }
    }, [currentUser]);

    if (!followers.length) return <p>No followers found.</p>;

    return (
        <div className="followers-container">
            <ul className="followers-list">
                {followers.map((follower) => (
                    <li key={follower.id} className="follower-item">
                        <div
                            className="follower-link"
                            onClick={(e) => {
                                e.preventDefault();
                                fetchUserInfo(follower.login).then(setCurrentUser);
                            }}
                        >
                            <img src={follower.avatar_url} alt={`${follower.login}'s avatar`} className="follower-avatar" />
                            <span className="follower-login">{follower.login}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowersList;