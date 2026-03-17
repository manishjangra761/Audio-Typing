import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import HomeDashboard from "../HomeDashboard";
import UploadAudioPage from "./UploadAudioPage";
import ManageAudio from "./ManageAudio";
import AdminResultPage from "./AdminResultPage";
import ResultDetails from "../Student Routes/ResultDetails";
import UsersPage from "./UsersPage";
import ProfilePage from "../../ProfilePage";

const AdminRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<HomeDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="upload-audio" element={<UploadAudioPage />} />
        <Route path="manage-audio" element={<ManageAudio />} />
        <Route path="results" element={<AdminResultPage />} />
        <Route path="results/:id" element={<ResultDetails />} />
        <Route path="profile" element={<ProfilePage />} />
      
      </Routes>
    </DashboardLayout>
  );
};

export default AdminRoutes;
