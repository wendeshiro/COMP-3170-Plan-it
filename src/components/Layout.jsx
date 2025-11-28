import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TopHeader from "./TopHeader";

export default function Layout() {
  const [location, setLocation] = useState(null);
  const [isAddPlanDisabled, setIsAddPlanDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(position);
      },
      (err) => {
        console.error(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const handleAddPlanClick = () => {
    navigate("/", { state: { rightView: "create" } });
  };

  return (
    <div>
      <TopHeader
        location={location}
        onAddPlan={handleAddPlanClick}
        addPlanDisabled={isAddPlanDisabled}
      />
      <Outlet context={{ setIsAddPlanDisabled }} />
    </div>
  );
}
