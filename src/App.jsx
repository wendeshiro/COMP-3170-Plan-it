import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import UpcomingPlan from "./pages/UpcomingPlan";
import CreatePlanPage from "./pages/CreatePlanPage";
import PlanDetail from "./pages/PlanDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UpcomingPlan />} />
        <Route path="/create" element={<CreatePlanPage />} />
        <Route path="/detail" element={<PlanDetail />} />
      </Routes>
    </div>
  );
}

export default App;
