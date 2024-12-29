import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Define types
interface GitHubUser {
    data: GitHubUser;
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    following: number;
    followers: number;
    location: string;
}

export interface Repository {
    id: number;
    name: string;
    avatar_url: string;
    html_url: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    language: string;
}

export interface Follower {
    id: number;
    login: string;
    avatar_url: string;
}

interface GitHubContextProps {
    fetchUserInfo: (username: string) => Promise<GitHubUser>;
    fetchRepositories: (username: string) => Promise<Repository[]>;
    fetchFollowers: (username: string) => Promise<Follower[]>;
    setCurrentUser: React.Dispatch<React.SetStateAction<GitHubUser | null>>;
    currentUser: GitHubUser | null;
    cache: Record<string, any>;
}

// Create context
const GitHubContext = createContext<GitHubContextProps | undefined>(undefined);

// Custom hook to access GitHub context
export const useGitHub = (): GitHubContextProps => {
    const context = useContext(GitHubContext);
    if (!context) {
        throw new Error("useGitHub must be used within a GitHubProvider");
    }
    return context;
};

const BASE_URL =
    import.meta.env.VITE_MODE === "development"
        ? "http://localhost:3000/api"
        : "https://projects.abhishektr.in/autonomize/api";

export const GitHubProvider = ({ children }: { children: ReactNode }) => {
    const [cache, setCache] = useState<Record<string, any>>({});
    const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null);

    // Function to fetch data with caching
    const fetchData = async <T,>(key: string, apiCall: () => Promise<T>): Promise<T> => {
        if (cache[key]) return cache[key];
        try {
            const data = await apiCall();
            setCache((prev) => ({ ...prev, [key]: data }));
            return data;
        } catch (error) {
            alert("Error fetching data or user not found . Please try again later.");
            throw error; // Rethrow the error after showing the alert
        }

    };

    // Fetch user info
    const fetchUserInfo = async (username: string): Promise<GitHubUser> => {
        const key = `user:${username}`;
        return fetchData<GitHubUser>(key, async () => {
            const response = await axios.post<GitHubUser>(`${BASE_URL}/save/${username}`);
            // const response = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`);
            return response.data.data;
        });
    };

    // Fetch repositories
    const fetchRepositories = async (username: string): Promise<Repository[]> => {
        const key = `repos:${username}`;
        return fetchData<Repository[]>(key, async () => {
            const response = await axios.get<Repository[]>(`https://api.github.com/users/${username}/repos`);
            console.log("response: ", response);
            return response.data;
        });
    };

    // Fetch followers
    const fetchFollowers = async (username: string): Promise<Follower[]> => {
        const key = `followers:${username}`;
        return fetchData<Follower[]>(key, async () => {
            const response = await axios.get<Follower[]>(`https://api.github.com/users/${username}/followers`);
            return response.data;
        });
    };

    return (
        <GitHubContext.Provider
            value={{
                fetchUserInfo,
                fetchRepositories,
                fetchFollowers,
                setCurrentUser,
                currentUser,
                cache,
            }}
        >
            {children}
        </GitHubContext.Provider>
    );
};
