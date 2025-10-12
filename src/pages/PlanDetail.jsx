import { useState } from 'react';
import InputCard from '../components/InputCard';
import DetailsItem from '../components/DetailsItem';
import DayPlanCard from '../components/DayPlanCard';
import DayPlanCardEvent from '../components/DayPlanCardEvent';
import PlanShareModal from '../components/PlanShareModal';
import shareBtn from '../assets/share-btn.svg';
import editBtn from '../assets/edit-btn.svg';

export default function PlanDetail() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };

  const handleEditClick = () => {
    console.log('Edit button clicked!');
  };

  const styles = `
    .planDetail {
        display: flex;
        flex-direction: column;
        gap: 10px;

        margin: 16px;
        padding: 0;
    }

    h3 {
        font-size: 30px;
        text-align: center;
        margin: 0;
        padding: 5px 0;
    }

    nav {
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
        gap: 80px;
        
    }

    .shareButton {
        display: flex;
        justify-content: flex-end; 
        gap: 10px;
    }

    .iconButton {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        transition: background-color 0.2s;
    }

    .iconButton:hover {
        background-color: white;
    }

    .iconButton:active {
        background-color: white;
    }

    .modalOverlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    `;

  return (
    <>
      <style>{styles}</style>
      <div className="planDetail">
        <nav>
          <h3>Details</h3>
          <div className="shareButton">
            <button className="iconButton" onClick={handleEditClick}>
              <img src={editBtn} alt="edit Button" />
            </button>
            <button className="iconButton" onClick={handleShareClick}>
              <img src={shareBtn} alt="share Button" />
            </button>
          </div>
        </nav>
        <InputCard
          cardTitle="Our 1st Korea Trip"
          showAddButton={false}
          style={{ '--input-label-size': '20px' }}
        >
          <DetailsItem title="Date" content="2025/10/04 - 2025/10/14" />
          <DetailsItem title="Destination" content="South Korea" />
          <DetailsItem title="Budget in currency" content="$4000" />
          <DetailsItem title="Members" content="wende, jisoo, yejin, sam" />
        </InputCard>
        <DayPlanCard
          cardTitle="Day 01 - Oct 3rd, 4th"
          weatherIcon="☀️"
          weather="Sunny 16°C / 11°C"
        >
          <DayPlanCardEvent
            date="2025/10/03"
            time="7:20"
            timeZone="PST"
            event="Vancouver airport"
            note="Double-check visa!"
          />
          <DayPlanCardEvent
            date="2025/10/04"
            time="18:00"
            timeZone="KST"
            event="Incheon airport"
          />
          <DayPlanCardEvent
            date="2025/10/04"
            time="20:00"
            timeZone="KST"
            event="Hotel check-in"
            note="Lotte Hotel in Hongdae"
          />
        </DayPlanCard>
        <DayPlanCard
          cardTitle="Day 02 - Oct 5th"
          weatherIcon="⛅️"
          weather="Cloudy 18°C / 9°C"
        >
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
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="modalOverlay" onClick={handleCloseModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <PlanShareModal onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
}
