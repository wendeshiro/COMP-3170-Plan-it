import "./App.css";
import DeleteModal from "./components/DeleteModal";
import { Button } from "./components/Button";
import CreatePlanButton from "./components/AddPlan";
import PlanCard from "./components/PlanCard";
import PlanShareModal from "./components/PlanShareModal";
import Input from "./components/Input";
import InputCard from "./components/InputCard";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
=======
import DayPlanCard from "./components/DayPlanCard";
import DayPlanCardEvent from "./components/DayPlanCardEvent";
import DetailsItem from "./components/DetailsItem";
>>>>>>> 0d9d98aaae75e2610b3f4ba522b41f3ad67f0bed

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Navbar navTitle="Navbar" />
=======
>>>>>>> 0d9d98aaae75e2610b3f4ba522b41f3ad67f0bed
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
<<<<<<< HEAD
        <Input title="Date" type="date" />
        <Input title="Destination" type="text" />
        <Input title="Budget in currency" type="number" showDollar={true} />
        <Input title="Members" />
      </InputCard>
=======
        <DetailsItem title="Date" content="2025/10/04 - 2025/10/14" />
        <DetailsItem title="Destination" content="South Korea" />
        <DetailsItem title="Budget in currency" content="$4000" />
        <DetailsItem title="Members" content="wende, jisoo, yejin, sam" />
      </InputCard>
      <DayPlanCard cardTitle="Day 01 - Oct 3rd, 4th" weatherIcon="☀️" weather="Sunny 16°C / 11°C">
        <DayPlanCardEvent
          date="2025/10/03"
          time="7:20"
          timeZone="PST"
          event="Vancouver airport"
          note="Double-check visa!"
        />
        <DayPlanCardEvent date="2025/10/04" time="18:00" timeZone="KST" event="Incheon airport" />
        <DayPlanCardEvent
          date="2025/10/04"
          time="20:00"
          timeZone="KST"
          event="Hotel check-in"
          note="Lotte Hotel in Hongdae"
        />
      </DayPlanCard>
      <DayPlanCard cardTitle="Day 02 - Oct 5th" weatherIcon="⛅️" weather="Cloudy 18°C / 9°C">
        <DayPlanCardEvent
          time="8:00"
          timeZone="KST"
          event="Korean style brunch"
          note="Very spicy hotpot! (Gukbap!)"
        />
        <DayPlanCardEvent
          time="10:00"
          timeZone="KST"
          event="Starfield Library"
          note="Very big beautiful library. and % cafe!"
        />
        <DayPlanCardEvent
          time="11:30"
          timeZone="KST"
          event="Shopping at Coex mall"
          note="Free time! shopping!!"
        />
        <DayPlanCardEvent
          time="14:30"
          timeZone="KST"
          event="London Bagel Museum"
          note="Not a museum, bagel cafe"
        />
      </DayPlanCard>
>>>>>>> 0d9d98aaae75e2610b3f4ba522b41f3ad67f0bed
    </div>
  );
}

export default App;
