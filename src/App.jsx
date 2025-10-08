import "./App.css";
import DeleteModal from "./components/DeleteModal";
import { Button } from "./components/Button";
import CreatePlanButton from "./components/AddPlan";

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
        </div>
    );
}

export default App;
