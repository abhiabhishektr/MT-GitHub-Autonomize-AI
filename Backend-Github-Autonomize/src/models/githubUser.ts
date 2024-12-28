import mongoose from 'mongoose';

const githubUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  bio: { type: String },
  location: { type: String },
  blog: { type: String },
  followers: { type: [String] }, // Array of followers' usernames
  following: { type: [String] }, // Array of users' usernames that they are following
  public_repos: { type: Number },
  public_gists: { type: Number },
  created_at: { type: Date },
  updated_at: { type: Date },
}, { timestamps: true });

const GitHubUser = mongoose.model('GitHubUser', githubUserSchema);

export default GitHubUser;
