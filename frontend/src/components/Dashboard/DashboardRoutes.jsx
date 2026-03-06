import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import HomeDashboard from "./HomeDashboard";
// import Results from "./Results";
import PracticePage from "./PracticePage";
import PracticePlayer from "./PracticePlayer";
import ResultPage from "./ResultPage";
import ResultDetails from "./ResultDetails";

const DashboardRoutes = () => {
  return (
    // <DashboardLayout>
      <Routes>
        <Route index element={<HomeDashboard />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="practice/:id" element={<PracticePlayer />} />
        <Route path="results" element={<ResultPage />} />
        <Route path="results/:id" element={<ResultDetails />} />
      </Routes>
    // </DashboardLayout>
  );
};

export default DashboardRoutes;
