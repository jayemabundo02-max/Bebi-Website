import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Navbar.css";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/songs", label: "Songs" },
  { to: "/messages", label: "Messages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/memories", label: "Memories" },
  { to: "/timeline", label: "Timeline" }
];

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <header className="navbar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">B</span>
        <span>
          <strong>Bebi Website</strong>
          <small>{user?.displayName || "Private archive"}</small>
        </span>
      </NavLink>
      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button className="ghost-button" type="button" onClick={logout}>
        Lock
      </button>
    </header>
  );
};

export default Navbar;
