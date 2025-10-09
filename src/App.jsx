import './App.css';
import DeleteModal from './components/DeleteModal';
import { Button } from './components/Button';
import CreatePlanButton from './components/AddPlan';
import PlanCard from './components/PlanCard';
import PlanShareModal from './components/PlanShareModal';

function App() {
  return (
    <div>
      <Button redSmall>Delete</Button>
      <Button redLarge>Delete</Button>
      <Button whiteSmall>Cancel</Button>
      <Button blueLarge>Save</Button>
      <Button whiteLarge>Cancel</Button>
      <CreatePlanButton />
      <DeleteModal />
      <PlanCard planName="Travel plan" planDate="2025-01-01" />
      <PlanShareModal />
    </div>
  );
}

export default App;
