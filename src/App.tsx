import { useState, useEffect } from "react";
import { useUserLocation } from "@hooks/useUserLocation";
import { TopBar } from "@components/TopBar";
import { UserLocationMapModal } from "@components/UserLocationMapModal";
import { RestaurantList } from "@components/RestaurantList/RestaurantList";
import { fetchOSMOverpassAPI, Restaurant } from "@api/OSMOverpassAPI";
import "./App.css";

const App = () => {
  const {
    latitude: initialLat,
    longitude: initialLon,
    error: userLocationError,
  } = useUserLocation();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [isUserLocationMapModalOpen, setIsUserLocationMapModalOpen] =
    useState(false);
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [restaurantError, setRestaurantError] = useState<string | null>(null);

  useEffect(() => {
    if (initialLat != null && initialLon != null) {
      setUserLocation({ lat: initialLat, lon: initialLon });
    }
  }, [initialLat, initialLon]);

  useEffect(() => {
    if (userLocation) {
      setRestaurantError(null);
      setLoading(true);
      fetchOSMOverpassAPI(userLocation.lat, userLocation.lon)
        .then((data) => {
          setRestaurantData(data);
        })
        .catch((err) => {
          console.error("Failed to fetch restaurant data:", err);
          setRestaurantError("Failed to fetch OpenStreetMap restaurant data");
        })
        .finally(() => setLoading(false));
    }
  }, [userLocation]);

  const openUserLocationMapModal = () => setIsUserLocationMapModalOpen(true);
  const closeUserLocationMapModal = () => setIsUserLocationMapModalOpen(false);

  const getMainContentByState = () => {
    if (userLocationError) {
      return (
        <div className="loading-and-error-state">
          <h1>{userLocationError}</h1>
        </div>
      );
    }

    if (restaurantError) {
      return (
        <div className="loading-and-error-state">
          <h1>{restaurantError}</h1>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="loading-and-error-state">
          <h1>Loading...</h1>
        </div>
      );
    }

    if (restaurantData.length === 0) {
      return (
        <div className="loading-and-error-state">
          <h1>No restaurants were found in this area.</h1>
          <h1>Please try searching a different location.</h1>
        </div>
      );
    }

    return (
      <main className="main-content">
        <RestaurantList restaurantData={restaurantData} />
      </main>
    );
  };

  return (
    <div className="app-container">
      <TopBar
        userLocation={userLocation}
        openUserLocationMapModal={openUserLocationMapModal}
      />
      {getMainContentByState()}
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
