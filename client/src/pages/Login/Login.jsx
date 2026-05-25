import { useState } from "react";
import { motion } from "framer-motion";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FloatingHearts from "../../components/FloatingHearts/FloatingHearts.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Login.css";

const Login = () => {
  const [accessCode, setAccessCode] = useState("");
  const [displayName, setDisplayName] = useState("Bebi");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login({ accessCode, displayName });
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-screen">
      <FloatingHearts />
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="login-card glass-card"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Private access only</p>
        <h1>Bebi Website</h1>
        <p>
          Enter your special date or private password to unlock the relationship archive.
        </p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Display name
            <input
              autoComplete="name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </label>
          <label>
            Special date or password
            <input
              autoComplete="current-password"
              inputMode="numeric"
              required
              type="password"
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
            />
          </label>
          {error ? <p className="error-text">{error}</p> : null}
          <button className="primary-button" disabled={submitting} type="submit">
            {submitting ? "Unlocking..." : "Unlock Archive"}
          </button>
        </form>
      </motion.section>
    </main>
  );
};

export default Login;
