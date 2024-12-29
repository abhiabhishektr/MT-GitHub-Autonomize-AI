import React from "react";
import { GitHubProvider } from "./context/GitHubContext";
import InputBox from "./components/InputBox";
import UserInfo from "./components/UserInfo";
import RepositoryList from "./components/RepositoryList";
import FollowersList from "./components/FollowersList";

const App: React.FC = () => {
  return (
    <GitHubProvider>
      <InputBox />
      <UserInfo />
      <RepositoryList />
      <FollowersList />
    </GitHubProvider>
  );
};

export default App;
 