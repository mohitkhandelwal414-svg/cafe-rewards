<div align="center">
  <h1>☕ CaféRewards</h1>
  <p><strong>A Modern Loyalty & Rewards Management System built for Cafés.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-646CFF?style=for-the-badge&logo=react" alt="Frontend"/>
    <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=nodedotjs" alt="Backend"/>
    <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB"/>
  </p>
</div>

---

## 📖 The Vision
The counter needs to be seamless. In **CaféRewards**, members earn points on every purchase and redeem them for free items. Regulars reach higher tiers (**Silver**, then **Gold**) that earn points even faster. 

This system empowers staff to record purchases, credit the correct points dynamically based on the member's tier, process redemptions, and always display the real-time live balance.

---

## ✨ Key Features
- **🔑 Staff Authentication:** Full JWT + bcrypt implementation for staff-level dashboard access.
- **📱 Real-time Member Lookup:** Powerful and fast member search via phone number (with full pagination and sorting).
- **💎 Dynamic Tiers:** Points multipliers based on loyalty! 
  - **Bronze** (1.0x multiplier) | *0 - 499 qualifying pts*
  - **Silver** (1.25x multiplier) | *500 - 999 qualifying pts*
  - **Gold** (1.5x multiplier) | *1000+ qualifying pts*
- **🛍️ Smooth Redemptions:** Instantly deducts points based on reward configurations.
- **📄 Audit Trail:** Real-time transaction history logs every single point earned or spent.

---

## 🚀 Quick Setup & Installation

Follow these instructions to run the full-stack system locally.

### 1. Clone the repository
```bash
git clone https://github.com/mohitkhandelwal414-svg/cafe-rewards.git
cd cafe-rewards
```

### 2. Backend Setup
```bash
cd server
npm install
```
You must create a `.env` file in the `/server` directory to safely hold the database credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
The application will launch beautifully on `http://localhost:5173`.

---

## 🔌 Core REST API Endpoints

The core functionalities are securely exposed via Express.

### Staff Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new staff member |
| `POST` | `/api/auth/login` | Login and receive a JWT token |

### Member Core
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/members` | Search members (Supports `search`, `page`, `limit`, `sortBy`) |
| `POST` | `/api/members` | Create a new loyalty member |
| `GET`  | `/api/members/:id/transactions` | Fetch all historical transactions for audit |

### Loyalty & Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/purchases` | Record a new purchase & calculate tier points |
| `GET`  | `/api/rewards` | Retrieve list of active, redeemable rewards |
| `POST` | `/api/redemptions` | Exchange loyalty points for an active reward |

---

## 🧠 Approach & Reasoning
The system places the authoritative power of loyalty point calculation exclusively on the **Backend Node server**. This guarantees no client-side manipulation can fake a tier upgrade or falsely redeem points. 

We deliberately separated the concepts of `pointsBalance` (what is physically spendable) and `qualifyingPoints` (lifetime accrued points that guarantee your tier regardless of how much you spend). The React frontend utilizes a single, sleek Dashboard UI to prevent the counter-staff from needing to constantly switch pages while a customer is waiting. All changes are completely real-time.

*Made with ❤️ by Mohit Khandelwal*