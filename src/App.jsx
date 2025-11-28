import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UpcomingPlan from "./pages/UpcomingPlan";
import CheckList from "./pages/CheckList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<UpcomingPlan />} />
        <Route path="checklist" element={<CheckList />} />
      </Routes>
    </div>
  );
}

export default App;
