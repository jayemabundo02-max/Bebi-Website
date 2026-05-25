import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="app-frame">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
