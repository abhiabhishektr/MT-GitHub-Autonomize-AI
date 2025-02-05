// Backend-Github-Autonomize/src/routes/githubRoutes.ts

import express, { NextFunction,Request, Response } from 'express';
import {
  saveGitHubUser,
  findMutualFollowers,
  updateGitHubUser,
  softDeleteGitHubUser,
  getAllGitHubUsers,
  searchGitHubUsers,
  welcome
} from '../controllers/githubController';
import {
  validateSaveGitHubUser,
  validateFindMutualFollowers,
  validateUpdateGitHubUser,
  validateSoftDeleteGitHubUser,
  validateGetAllGitHubUsers,
  validateSearchGitHubUsers,
} from '../utils/validateInputs';

import { handleValidationErrors } from '../middlewares/validationMiddleware'; 

const router = express.Router();

router.get('/',welcome);

// Save GitHub user data
router.post('/save/:username', validateSaveGitHubUser, handleValidationErrors, saveGitHubUser);

// Find mutual followers
router.get('/mutual-followers/:username', validateFindMutualFollowers, handleValidationErrors, findMutualFollowers);

// Search GitHub users
router.get('/search', validateSearchGitHubUsers, handleValidationErrors, searchGitHubUsers);

// Soft delete GitHub user
router.delete('/delete/:username', validateSoftDeleteGitHubUser, handleValidationErrors, softDeleteGitHubUser);

// Update GitHub user information
router.put('/update/:username', validateUpdateGitHubUser, handleValidationErrors, updateGitHubUser);

// Get all GitHub users sorted by a field
router.get('/all', validateGetAllGitHubUsers, handleValidationErrors, getAllGitHubUsers);



export default router;



