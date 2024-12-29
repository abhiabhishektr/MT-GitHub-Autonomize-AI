import React, { useState } from "react";
import { GitHubProvider } from "./context/GitHubContext";
import InputBox from "./components/InputBox/InputBox";
import UserInfo from "./components/UserInfo/UserInfo";
import RepositoryList from "./components/RepositoryList/RepositoryList";
import FollowersList from "./components/FollowersList/FollowersList";
import './App.css';
import ErrorBoundary from "./ErrorBoundary";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"repositories" | "followers">("repositories");

  return (
    <GitHubProvider>
      <ErrorBoundary>
        <InputBox />
        <UserInfo setActiveTab={setActiveTab} activeTab={activeTab} />
        {activeTab === "repositories" && <RepositoryList />}
        {activeTab === "followers" && <FollowersList />}
      </ErrorBoundary>
    </GitHubProvider>
  );
};

export default App;
