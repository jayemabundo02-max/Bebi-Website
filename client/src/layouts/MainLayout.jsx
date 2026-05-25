import { Outlet } from "react-router-dom";
import FloatingHearts from "../components/FloatingHearts/FloatingHearts.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import NotificationPopup from "../components/NotificationPopup/NotificationPopup.jsx";

const MainLayout = () => {
  return (
    <div className="app-shell">
      <FloatingHearts />
      <Navbar />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
      <NotificationPopup />
    </div>
  );
};

export default MainLayout;
