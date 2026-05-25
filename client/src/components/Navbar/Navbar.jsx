import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Songs", to: "/songs" },
  { label: "Messages", to: "/messages" },
  { label: "Gallery", to: "/gallery" },
  { label: "Memories", to: "/memories" },
  { label: "Timeline", to: "/timeline" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <NavLink className="brand-mark" to="/" onClick={() => setIsOpen(false)}>
        <span className="brand-orb" aria-hidden="true" />
        <span>
          <strong>Bebi Website</strong>
          <small>{profile?.displayName || "Private archive"}</small>
        </span>
      </NavLink>

      <button
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        className="nav-toggle"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={isOpen ? "nav-links is-open" : "nav-links"}>
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
            key={item.to}
            onClick={() => setIsOpen(false)}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink className="nav-link admin-link" onClick={() => setIsOpen(false)} to="/admin">
          Admin
        </NavLink>
        <button className="ghost-button small" onClick={handleLogout} type="button">
          Lock
        </button>
      </nav>
    </header>
  );
}
