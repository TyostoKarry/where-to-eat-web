import { useState, useEffect } from "react";
import { useUserLocation } from "@hooks/useUserLocation";
import { TopBar } from "./components/TopBar/TopBar";
import "./App.css";
import { RestaurantList } from "@components/RestaurantList/RestaurantList";

const App = () => {
  const { latitude: initialLat, longitude: initialLon } = useUserLocation();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  // ✅ Use useEffect to set userLocation once useUserLocation loads
  useEffect(() => {
    if (initialLat != null && initialLon != null) {
      setUserLocation({ lat: initialLat, lon: initialLon });
    }
  }, [initialLat, initialLon]);

  return (
    <div className="app-container">
      <TopBar userLocation={userLocation} setUserLocation={setUserLocation} />
      <main className="main-content">
        {userLocation && <RestaurantList userLocation={userLocation} />}
      </main>
    </div>
  );
};

export default App;
