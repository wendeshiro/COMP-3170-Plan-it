import "./App.css";
import DeleteModal from "./components/DeleteModal";
import { Button } from "./components/Button";
import CreatePlanButton from "./components/AddPlan";
import PlanCard from "./components/PlanCard";
import PlanShareModal from "./components/PlanShareModal";
import Input from "./components/input";
import InputCard from "./components/InputCard";

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
            <Input title="Tour Name" />
            <Input title="Date" type="date" />
            <InputCard cardTitle="Day 1" style={{ "--input-label-size": "20px" }}>
                <Input title="Location 01" />
                <Input title="Date" type="date" />
                <Input title="Time" type="time" />
                <Input title="Note" />
            </InputCard>
            <InputCard
                cardTitle="Our 1st Korea Trip"
                showAddButton={false}
                style={{ "--input-label-size": "20px" }}
            >
                <Input title="Date" type="date" />
                <Input title="Destination" type="text" />
                <Input title="Budget in currency" type="number" showDollar={true} />
                <Input title="Members" />
            </InputCard>
        </div>
    );
}

export default App;
