import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import HomeDashboard from "./HomeDashboard";
// import Results from "./Results";
import PracticePage from "./PracticePage";

const DashboardRoutes = () => {
  return (
    // <DashboardLayout>
      <Routes>
        <Route index element={<HomeDashboard />} />
        <Route path="practice" element={<PracticePage />} />
        {/* <Route path="results" element={<Results />} /> */}
      </Routes>
    // </DashboardLayout>
  );
};

export default DashboardRoutes;
