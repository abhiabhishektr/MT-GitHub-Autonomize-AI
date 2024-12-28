// Backend-Github-Autonomize/src/utils/validateInputs.ts

import { body, param, query } from 'express-validator';

// Validation for saving a GitHub user
export const validateSaveGitHubUser = [
  param('username')
    .notEmpty()
    .withMessage('GitHub username is required')
    .isString()
    .withMessage('GitHub username must be a string'),
];

// Validation for mutual followers
export const validateFindMutualFollowers = [
  param('username')
    .notEmpty()
    .withMessage('GitHub username is required')
    .isString()
    .withMessage('GitHub username must be a string'),
];

// Validation for updating user information
export const validateUpdateGitHubUser = [
  param('username')
    .notEmpty()
    .withMessage('GitHub username is required')
    .isString()
    .withMessage('GitHub username must be a string'),
  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string'),
  body('blog')
    .optional()
    .isURL()
    .withMessage('Blog must be a valid URL'),
  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string'),
];

// Validation for soft delete
export const validateSoftDeleteGitHubUser = [
  param('username')
    .notEmpty()
    .withMessage('GitHub username is required')
    .isString()
    .withMessage('GitHub username must be a string'),
];

// Validation for getting all users
export const validateGetAllGitHubUsers = [
  query('sortBy')
    .optional()
    .isIn(['public_repos', 'public_gists', 'followers', 'following', 'created_at'])
    .withMessage('SortBy must be one of public_repos, public_gists, followers, following, or created_at'),
];

// Validation for searching GitHub users
export const validateSearchGitHubUsers = [
  query('username')
    .optional()
    .isString()
    .withMessage('Username must be a string'),
  query('location')
    .optional()
    .isString()
    .withMessage('Location must be a string'),
  query('name')
    .optional()
    .isString()
    .withMessage('Name must be a string'),
];
