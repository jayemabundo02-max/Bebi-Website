import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import Anniversary from "../pages/Anniversary/Anniversary";
import Calendar from "../pages/Calendar/Calendar";
import Gallery from "../pages/Gallery/Gallery";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Memories from "../pages/Memories/Memories";
import Message from "../pages/Message/Message";
import OurSong from "../pages/OurSong/OurSong";
import Timeline from "../pages/Timeline/Timeline";
import Upload from "../pages/Upload/Upload";

function ProtectedOutlet() {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <main className="page-shell center-shell">
        <motion.div
          animate={{ opacity: [0.55, 1, 0.55], scale: [0.98, 1, 0.98] }}
          className="glass-card loading-card"
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          Opening the archive...
        </motion.div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedOutlet />}>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/songs" element={<OurSong />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/anniversary" element={<Anniversary />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/admin" element={<Upload />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
