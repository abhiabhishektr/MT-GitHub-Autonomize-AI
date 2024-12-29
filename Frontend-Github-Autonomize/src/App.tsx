import React from "react";
import { GitHubProvider } from "./context/GitHubContext";
import InputBox from "./components/InputBox/InputBox";
import UserInfo from "./components/UserInfo/UserInfo";
import RepositoryList from "./components/RepositoryList/RepositoryList";
import FollowersList from "./components/FollowersList/FollowersList";
import './App.css'
import ErrorBoundary from "./ErrorBoundary";

const App: React.FC = () => {
  return (
    <GitHubProvider>
     <ErrorBoundary>
        <InputBox />
      </ErrorBoundary>
      <UserInfo />
      <RepositoryList />
      <FollowersList />
    </GitHubProvider>
  );
};

export default App;
 