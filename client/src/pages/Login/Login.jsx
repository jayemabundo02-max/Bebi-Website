import { motion } from "framer-motion";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/helpers";

export default function Login() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from?.pathname || "/";

  if (isAuthenticated) {
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(accessCode.trim());
      navigate(destination, { replace: true });
    } catch (loginError) {
      setError(getErrorMessage(loginError, "The access code does not match this archive."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <motion.form
        animate={{ opacity: 1, y: 0 }}
        className="glass-card login-card"
        initial={{ opacity: 0, y: 28 }}
        onSubmit={handleSubmit}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="brand-orb large" aria-hidden="true" />
        <p className="eyebrow">Private access</p>
        <h1>Bebi Website</h1>
        <p>Enter the special date or private password to unlock the relationship archive.</p>

        <label htmlFor="access-code">Special date or password</label>
        <input
          autoComplete="current-password"
          id="access-code"
          onChange={(event) => setAccessCode(event.target.value)}
          placeholder="Example: 1208"
          required
          type="password"
          value={accessCode}
        />

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Unlocking..." : "Unlock archive"}
        </button>
      </motion.form>
    </main>
  );
}
