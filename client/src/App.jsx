import { useState } from "react";
import "./App.css";
import { registerUser, loginUser } from "./api";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      let result;

      if (showLogin) {
        result = await loginUser(email, password);

        if (result.token) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));

          setMessage("Login successful!");
        } else {
          setMessage(result.message || "Login failed");
        }
      } else {
        result = await registerUser(name, email, password);

        if (result.user) {
          setMessage("Registration successful! Please sign in.");

          setShowLogin(true);
          setName("");
          setPassword("");
        } else {
          setMessage(result.message || "Registration failed");
        }
      }
    } catch (error) {
      setMessage("Unable to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="hero">

        <div className="brand">
          <div className="logo">☕</div>
          <h1>CaféRewards</h1>
        </div>

        <div className="hero-content">

          <div className="hero-text">

            <span className="badge">
              LOYALTY MANAGEMENT SYSTEM
            </span>

            <h2>
              Reward your customers.
              <br />
              <span>Grow your café.</span>
            </h2>

            <p>
              Manage members, track purchases, calculate loyalty points,
              and build lasting customer relationships.
            </p>

            <div className="features">
              <div>✓ Smart Rewards</div>
              <div>✓ Member Management</div>
              <div>✓ Purchase Tracking</div>
            </div>

          </div>

          <div className="auth-card">

            <h3>
              {showLogin ? "Welcome Back" : "Create Account"}
            </h3>

            <p className="subtitle">
              {showLogin
                ? "Sign in to manage your café rewards"
                : "Register your staff account"}
            </p>

            <form onSubmit={handleSubmit}>

              {!showLogin && (
                <div className="input-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <label>Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : showLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>

            </form>

            {message && (
              <p className="message">
                {message}
              </p>
            )}

            <div className="switch">

              {showLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={() => {
                  setShowLogin(!showLogin);
                  setMessage("");
                }}
              >
                {showLogin ? " Register" : " Sign In"}
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;