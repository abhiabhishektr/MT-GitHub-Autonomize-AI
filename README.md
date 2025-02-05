# **Autonomize AI - GitHub User Data Integration**

This project is a **full-stack TypeScript** application designed to interact with GitHub's API to fetch user data, display repositories, and handle mutual followers as friends. The application includes both the **backend** (Node.js with Express, MongoDB, and TypeScript) and **frontend** (React with TypeScript) to provide a complete solution.

## **Table of Contents**
- [**Autonomize AI - GitHub User Data Integration**](#autonomize-ai---github-user-data-integration)
  - [**Table of Contents**](#table-of-contents)
  - [**Project Overview**](#project-overview)
    - [**Key Features:**](#key-features)
  - [**Backend Setup**](#backend-setup)
    - [**Prerequisites:**](#prerequisites)
    - [**Instructions:**](#instructions)
    - [**Backend Folder Structure:**](#backend-folder-structure)
  - [**Frontend Setup**](#frontend-setup)
    - [**Instructions:**](#instructions-1)
    - [**Frontend Folder Structure:**](#frontend-folder-structure)
  - [**Features Implemented**](#features-implemented)
  - [**API Documentation**](#api-documentation)
  - [**Deployment**](#deployment)
  - [**Technologies Used**](#technologies-used)
  - [**GitHub Workflow - CI/CD**](#github-workflow---cicd)
    - [**CI Workflow:**](#ci-workflow)
    - [**CD Workflow:**](#cd-workflow)
    - [**GitHub Action Configuration**:](#github-action-configuration)

## **Project Overview**

This project allows users to:
- Fetch GitHub user data and store it in a database.
- Search for users based on various parameters like username, location, etc.
- Identify mutual followers and save them as "friends."
- Perform basic CRUD operations such as updating, soft-deleting records, and fetching sorted user lists.
- Display repositories and followers through a user-friendly frontend.

### **Key Features:**
- **Frontend**: Displays repositories, user info, and mutual followers. Implements React hooks, Context API, and caching for efficient data fetching.
- **Backend**: Uses Express, MongoDB, and TypeScript to implement REST APIs for user data management, API validation, and security enhancements.
- **Deployment**: Hosted on AWS EC2 with a custom domain for better performance and accessibility.

## **Backend Setup**

### **Prerequisites:**
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- TypeScript
- Git

### **Instructions:**

1. Clone the repository:
   ```bash
   git clone https://github.com/abhiabhishektr/MT-GitHub-Autonomize-AI.git
   cd MT-GitHub-Autonomize-AI
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure environment variables in the `.env` file:
   - `PORT` - Port for the backend server.
   - `MONGO_URI` - MongoDB connection string (local or Atlas).
   - `GITHUB_TOKEN` - GitHub API token.

4. Run the backend server:
   ```bash
   yarn dev
   ```

### **Backend Folder Structure:**

```
Backend-Github-Autonomize
│
├── src
│   ├── app.ts                 # Main entry point
│   ├── .env                   # Environment configuration
│   ├── config
│   │   ├── db.ts              # Database configuration (MongoDB)
│   │   ├── env.ts             # Environment variable management
│   │   └── jwt.ts             # JWT authentication configuration
│   ├── controllers            # Logic for API endpoints
│   ├── middlewares
│   │   ├── errorHandler.ts    # Global error handler
│   │   └── logger.ts          # Logger configuration (winston/morgan)
│   ├── models                 # MongoDB models (e.g., User, Friend)
│   ├── routes                 # Routes for API endpoints
│   ├── types
│   │   └── express
│   │       └── index.d.ts     # Custom types for Express
│   ├── utils
│   │   ├── response.ts        # Utility for API responses
│   │   └── validateInputs.ts  # Input validation functions
│   └── yarn.lock              # Yarn dependency lock file
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
```

## **Frontend Setup**

### **Instructions:**

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the frontend application:
   ```bash
   yarn start
   ```

### **Frontend Folder Structure:**
```
src
├── context
│   └── githubContext.tsx      # Context for managing GitHub data
├── components
│   ├── FollowerList.tsx       # Displays list of followers
│   ├── Input.tsx              # User input for GitHub username
│   ├── RepositoryList.tsx     # Displays repositories of the user
│   └── UserInfo.tsx           # Displays user details
```

## **Features Implemented**

- **Backend**:
  - Fetches GitHub user data and stores it in MongoDB.
  - Identifies mutual followers and saves them as "friends."
  - Performs search operations by username, location, etc.
  - Soft deletes records based on username.
  - Updates user fields such as location, bio, etc.
  - Sorted listing of users based on different fields like followers, repositories, etc.
  
- **Frontend**:
  - Displays GitHub repositories for a given user.
  - Shows user info including avatar, bio, and repositories.
  - Lists followers and allows navigation between users.
  - Implements React hooks, Context API, and caching for efficient data handling.

## **API Documentation**

The API endpoints are documented for easy testing and interaction with the backend. You can access the detailed API documentation on Postman:

[Postman API Documentation](https://documenter.getpostman.com/view/31049459/2sAYJ6DLVZ)

Additionally, to use the Postman collection for testing the API, you can import the following file into Postman:
- **Postman Collection**: [Abhishek-Autonomize-Backend API.postman_collection](https://github.com/abhiabhishektr/MT-GitHub-Autonomize-AI/blob/main/Abhishek-Autonomize-Backend%20API.postman_collection.json)

## **Deployment**

- **Backend API**: Hosted on [AWS EC2](https://projects.abhishektr.in/autonomize/api/) for better performance and scalability.
- **Frontend**: Deployed to [Frontend URL](https://autonomize.abhishektr.in/) for easy access and testing.
- **Custom Domain**: The project is hosted on a custom domain to ensure seamless access.

## **Technologies Used**

- **Backend**: Node.js, Express, TypeScript, MongoDB, JWT, Helmet, morgan, Rate Limiting, CORS
- **Frontend**: React, TypeScript, React Hooks, React Context, Axios, CSS
- **Other Tools**: AWS EC2 for deployment, Postman for API testing, GitHub for version control, Custom domain for the live website

## **GitHub Workflow - CI/CD**

This project uses **GitHub Actions** to automate the CI/CD process. Every push to any branch triggers the following workflow:

### **CI Workflow:**
1. **Build**: Runs build process for both backend and frontend code when any branch is pushed.
   - Builds the Docker images for backend and frontend.
   - Linting and code quality checks are also performed.

### **CD Workflow:**
1. **Deployment**:
   - The deployment process only occurs from the `main` branch.
   - Upon merging into `main`, the latest backend and frontend code is deployed to **AWS EC2**.
   - The deployment process includes environment-specific variables and configurations.

### **GitHub Action Configuration**:
You can find the configuration in the `.github/workflows` directory.
