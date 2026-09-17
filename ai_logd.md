# AI Logs — CaféRewards

This file contains the AI-assisted development conversation and decisions used while building the CaféRewards Loyalty & Rewards Management System.

---

## Project

**Project Name:** CaféRewards — Loyalty & Rewards Management System

**Stack:**
- React
- Vite
- CSS
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## AI-Assisted Development Log

### 1. Project Understanding

AI was used to understand the assessment requirements and break the project into smaller implementation steps.

The project requires:

- A React frontend
- A Node.js/Express backend
- MongoDB persistence
- JWT authentication
- Member management
- Loyalty point calculation
- Membership tiers
- Rewards
- Purchases
- Redemptions
- Transaction history
- REST APIs
- README documentation
- Reasoning documentation

---

### 2. Database Design

AI assistance was used to design the following MongoDB models:

#### User

Fields:

- name
- email
- passwordHash
- role
- timestamps

#### Member

Fields:

- name
- phone
- pointsBalance
- qualifyingPoints
- tier
- timestamps

#### Reward

Fields:

- name
- description
- pointsRequired
- active
- timestamps

#### Transaction

Fields:

- memberId
- type
- points
- purchaseAmount
- rewardId
- balanceAfter
- timestamps

---

### 3. Authentication

AI assistance was used to implement:

- User registration
- Password hashing using bcryptjs
- User login
- JWT token generation
- JWT authentication middleware
- Current-user endpoint

Authentication endpoints:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me