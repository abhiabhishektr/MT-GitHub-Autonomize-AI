import mongoose from 'mongoose';

const githubUserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  avatar_url: { type: String },
  name: { type: String },
  bio: { type: String },
  location: { type: String },
  blog: { type: String },
  followers: { type: Number },
  following: { type: Number },
  public_repos: { type: Number },
  public_gists: { type: Number },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

const GitHubUser = mongoose.model('GitHubUser', githubUserSchema);

export default GitHubUser;
