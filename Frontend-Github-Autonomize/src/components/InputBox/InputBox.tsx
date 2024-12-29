import React, { useState } from "react";
import { useGitHub } from "../../context/GitHubContext";
import './styles.css';

const InputBox: React.FC = () => {
  const [username, setUsername] = useState<string>("abhiabhishektr");
  const { fetchUserInfo, setCurrentUser } = useGitHub();

  const handleSubmit = async () => {
    if (!username.trim()) return;
    const userInfo = await fetchUserInfo(username);
    setCurrentUser(userInfo);
  };

  return (
    <div className="search-form">
      <h2>Enter Your Github Username</h2>
    <div className="input-container">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
     </div>
  );
};

export default InputBox;