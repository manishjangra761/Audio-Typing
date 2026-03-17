import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import HomeDashboard from "../HomeDashboard";
// import Results from "./Results";
import PracticePage from "../Student Routes/PracticePage";
import PracticePlayer from "../Student Routes/PracticePlayer";
import ResultPage from "../Student Routes/ResultPage";
import ResultDetails from "../Student Routes/ResultDetails";
import ProfilePage from "../../ProfilePage";

const StudentRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<HomeDashboard />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="practice/:id" element={<PracticePlayer />} />
        <Route path="results" element={<ResultPage />} />
        <Route path="results/:id" element={<ResultDetails />} />
        <Route path="history" element={<ResultPage />} />
        <Route path="history/:id" element={<ResultDetails />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentRoutes;
