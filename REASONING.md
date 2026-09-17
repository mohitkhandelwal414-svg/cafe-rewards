# REASONING — CaféRewards

## 1. Project Overview

CaféRewards is a full-stack Loyalty & Rewards Management System for cafés.

The system allows staff to:

- Register and log in securely
- Manage loyalty members
- Search and view members
- Track customer purchases
- Calculate loyalty points
- Manage membership tiers
- Create and manage rewards
- Redeem rewards
- Maintain transaction history

The application uses React for the frontend, Node.js and Express for the backend, and MongoDB for persistent storage.

---

## 2. Technology Decisions

### Frontend — React + Vite

React was selected to build a component-based and interactive user interface.

Vite is used as the development and build tool because it provides a simple and fast React development environment.

CSS is used for styling and responsive layouts.

### Backend — Node.js + Express

Node.js with Express was selected to implement the REST API.

Express provides:

- Routing
- Middleware
- Request handling
- JSON API responses
- Authentication middleware integration

### Database — MongoDB + Mongoose

MongoDB was selected as the persistent database.

Mongoose is used to define schemas and interact with MongoDB.

The main collections are:

- Users
- Members
- Rewards
- Transactions

### Authentication — JWT + bcryptjs

JWT is used to authenticate staff members and protect API endpoints.

bcryptjs is used to hash passwords before storing them.

Plain-text passwords are never stored in the database.

---

## 3. Database Design

### User

The User collection stores staff account information.

Fields:

```text
name
email
passwordHash
role
createdAt
updatedAt