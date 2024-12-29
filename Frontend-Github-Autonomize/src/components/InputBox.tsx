import React, { useState } from "react";
import { useGitHub } from "../context/GitHubContext";

const InputBox: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const { fetchUserInfo, setCurrentUser } = useGitHub();

  const handleSubmit = async () => {
    if (!username.trim()) return;
    const userInfo = await fetchUserInfo(username);
    setCurrentUser(userInfo);
  };

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default InputBox;

