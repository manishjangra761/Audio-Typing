import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import HomeDashboard from "../HomeDashboard";
import UploadAudioPage from "./UploadAudioPage";
import ManageAudio from "./ManageAudio";
import AdminResultPage from "./AdminResultPage";
// import PracticePlayer from "./PracticePlayer";
// import ResultDetails from "./ResultDetails";

const StudentRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<HomeDashboard />} />
        <Route path="upload-audio" element={<UploadAudioPage />} />
        <Route path="manage-audio" element={<ManageAudio />} />
        <Route path="results" element={<AdminResultPage />} />
        {/*<Route path="results/:id" element={<ResultDetails />} />
        <Route path="history" element={<ResultPage />} />
        <Route path="history/:id" element={<ResultDetails />} /> */}
      </Routes>
    </DashboardLayout>
  );
};

export default StudentRoutes;
