import React, { useState } from "react";
import { useGitHub } from "../../context/GitHubContext";
import './styles.css';

const InputBox: React.FC = () => {
  const [username, setUsername] = useState<string>("abhiabhishektr");
  const { fetchUserInfo, setCurrentUser, cache } = useGitHub();

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
      {Object.keys(cache).length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h2>Welcome to the GitHub User Search!</h2>
          <p>Please enter a username to explore repositories and followers.</p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            For more details and to explore my code, visit my <a href="https://github.com/abhiabhishektr/MT-GitHub-Autonomize-AI" target="_blank" rel="noopener noreferrer" style={{ color: '#0073e6' }}>GitHub account</a>.
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Feel free to reach out to me via email at <a href="mailto:abhiabhishektr@gmail.com" style={{ color: '#0073e6' }}>abhiabhishektr@gmail.com</a>.
          </p>
          <p style={{ fontSize: '14px', color: '#888' }}>
            Task done by <span style={{ fontWeight: 'bold', color: '#0073e6' }}>Abhishek T R</span>
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Explore the remaining backend tasks through the API:
            <a href="https://projects.abhishektr.in/autonomize/api" target="_blank" rel="noopener noreferrer" style={{ color: '#0073e6' }}>
              Backend API
            </a>
            .
            For detailed API documentation, visit the
            <a href="https://documenter.getpostman.com/view/31049459/2sAYJ6DLVZ" target="_blank" rel="noopener noreferrer" style={{ color: '#0073e6' }}>
              Postman API Docs
            </a>.
          </p>
        </div>
      )}




    </div>
  );
};

export default InputBox;