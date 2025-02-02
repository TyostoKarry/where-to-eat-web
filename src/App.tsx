import { useState, useEffect } from "react";
import { useUserLocation } from "@hooks/useUserLocation";
import { TopBar } from "@components/TopBar";
import { UserLocationMapModal } from "@components/UserLocationMapModal";
import "./App.css";
import { RestaurantList } from "@components/RestaurantList/RestaurantList";

const App = () => {
  const { latitude: initialLat, longitude: initialLon } = useUserLocation();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [isUserLocationMapModalOpen, setIsUserLocationMapModalOpen] =
    useState(false);

  useEffect(() => {
    if (initialLat != null && initialLon != null) {
      setUserLocation({ lat: initialLat, lon: initialLon });
    }
  }, [initialLat, initialLon]);

  const openUserLocationMapModal = () => setIsUserLocationMapModalOpen(true);
  const closeUserLocationMapModal = () => setIsUserLocationMapModalOpen(false);

  return (
    <div className="app-container">
      <TopBar
        userLocation={userLocation}
        openUserLocationMapModal={openUserLocationMapModal}
      />
      <main className="main-content">
        {userLocation && <RestaurantList userLocation={userLocation} />}
      </main>
      {isUserLocationMapModalOpen && userLocation && (
        <UserLocationMapModal
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          onClose={closeUserLocationMapModal}
        />
      )}
    </div>
  );
};

export default App;
