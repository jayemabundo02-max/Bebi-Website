import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Anniversary from "../pages/Anniversary/Anniversary.jsx";
import Calendar from "../pages/Calendar/Calendar.jsx";
import Gallery from "../pages/Gallery/Gallery.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Memories from "../pages/Memories/Memories.jsx";
import Message from "../pages/Message/Message.jsx";
import OurSong from "../pages/OurSong/OurSong.jsx";
import Timeline from "../pages/Timeline/Timeline.jsx";
import Upload from "../pages/Upload/Upload.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<OurSong />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/anniversary" element={<Anniversary />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
