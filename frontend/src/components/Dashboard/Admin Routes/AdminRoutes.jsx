import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import HomeDashboard from "../HomeDashboard";
import UploadAudioPage from "./UploadAudioPage";
// import PracticePage from "./PracticePage";
// import PracticePlayer from "./PracticePlayer";
// import ResultPage from "./ResultPage";
// import ResultDetails from "./ResultDetails";

const StudentRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<HomeDashboard />} />
        <Route path="upload-audio" element={<UploadAudioPage />} />
        {/* <Route path="practice/:id" element={<PracticePlayer />} />
        <Route path="results" element={<ResultPage />} />
        <Route path="results/:id" element={<ResultDetails />} />
        <Route path="history" element={<ResultPage />} />
        <Route path="history/:id" element={<ResultDetails />} /> */}
      </Routes>
    </DashboardLayout>
  );
};

export default StudentRoutes;
