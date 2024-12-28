import { Request, Response } from 'express';
import axios from 'axios';
import GitHubUser from '../models/githubUser';
import sendResponse from '../utils/response';

// Save GitHub user data
export const saveGitHubUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    // Check if user already exists in the database
    const existingUser = await GitHubUser.findOne({ username });

    if (existingUser) {
      if (existingUser.deleted) {
        sendResponse(res, 400, 'GitHub user is marked as deleted');
        return;
      }
      sendResponse(res, 200, 'User already exists in the database', existingUser);
      return;
    }

    // Fetch user data from GitHub API
    const githubResponse = await axios.get(`https://api.github.com/users/${username}`);
    const { login, name, bio, location, blog, followers, following, public_repos, public_gists, created_at } = githubResponse.data;

    // Create new user entry in the database
    const newUser = new GitHubUser({
      username: login,
      name,
      bio,
      location,
      blog,
      followers,
      following,
      public_repos,
      public_gists,
      created_at,
    });

    const savedUser = await newUser.save();

    sendResponse(res, 201, 'GitHub user saved successfully', savedUser);
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 404) {
        sendResponse(res, 404, 'GitHub user not found');
        return;
      }
    }

    console.error('Error saving GitHub user: ', error);
    sendResponse(res, 500, 'Error saving GitHub user');
  }
};


// Find mutual followers
export const findMutualFollowers = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    const user = await GitHubUser.findOne({ username });
    if (!user) {
      sendResponse(res, 404, 'User not found');
      return;
    }

    // Fetch followers and following
    const [followersResponse, followingResponse] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}/followers`),
      axios.get(`https://api.github.com/users/${username}/following`)
    ]);

    const followers = followersResponse.data;
    const following = followingResponse.data;

    // Find mutual followers
    const mutualFollowers = followers.filter((follower: any) =>
      following.some((followed: any) => followed.login === follower.login)
    );

    // Save mutual followers
    // await Promise.all(mutualFollowers.map(async (follower: any) => {
    //   const friend = new GitHubUser({
    //     username: follower.login,
    //     name: follower.name,
    //     bio: follower.bio
    //   });
    //   await friend.save();
    // }));

    sendResponse(res, 200, 'Mutual followers found and saved', mutualFollowers);
  } catch (error) {
    console.error('Error finding mutual followers: ', error);
    sendResponse(res, 500, 'Error finding mutual followers');
  }
};


// Search users by username or location
export const searchGitHubUsers = async (req: Request, res: Response): Promise<void> => {
  const { username, location, name } = req.query;
  console.log("req.query: ", req.query);

  try {
    // Only include non-empty conditions
    const conditions = [];
    if (username) conditions.push({ username: { $regex: username, $options: 'i' } });
    if (location) conditions.push({ location: { $regex: location, $options: 'i' } });
    if (name) conditions.push({ name: { $regex: name, $options: 'i' } });

    // If no conditions, return all users
    const query = conditions.length > 0 ? { $or: conditions } : {};

    const users = await GitHubUser.find(query);
    sendResponse(res, 200, 'Search results', users);
  } catch (error) {
    console.error('Error searching users: ', error);
    sendResponse(res, 500, 'Error searching users');
  }
};


// Soft delete GitHub user
export const softDeleteGitHubUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    const deletedUser = await GitHubUser.findOneAndUpdate(
      { username },
      { deleted: true },
      { new: true } // to return the updated doc 
    );

    if (!deletedUser) {
      sendResponse(res, 404, 'User not found');
      return;
    }

    sendResponse(res, 200, 'GitHub user soft deleted successfully', deletedUser);
  } catch (error) {
    console.error('Error soft deleting GitHub user: ', error);
    sendResponse(res, 500, 'Error soft deleting GitHub user');
  }
};

// Update GitHub user info
export const updateGitHubUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  const { bio, location, blog } = req.body;

  try {
    const updatedUser = await GitHubUser.findOneAndUpdate(
      { username },
      { bio, location, blog },
      { new: true }
    );

    if (!updatedUser) {
      sendResponse(res, 404, 'User not found');
      return;
    }

    sendResponse(res, 200, 'GitHub user updated successfully', updatedUser);
  } catch (error) {
    console.error('Error updating GitHub user: ', error);
    sendResponse(res, 500, 'Error updating GitHub user');
  }
};



// Get all GitHub users from DB sorted by a given field
export const getAllGitHubUsers = async (req: Request, res: Response): Promise<void> => {
  const { sortBy } = req.query;

  try {
    const users = await GitHubUser.find().sort({ [sortBy as string]: 1 });
    sendResponse(res, 200, 'GitHub users fetched successfully', users);
  } catch (error) {
    console.error('Error fetching GitHub users: ', error);
    sendResponse(res, 500, 'Error fetching GitHub users');
  }
};


