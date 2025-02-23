import { fetchOSMOverpassAPI, Restaurant } from "@api/OSMOverpassAPI";
import {
  OpenStreetMapError,
  RestaurantListEmpty,
  UnexpectedError,
  UserLocationError,
} from "@components/ErrorStates";
import { RestaurantListSkeleton } from "@components/RestaurantList";
import { RestaurantList } from "@components/RestaurantList/RestaurantList";
import { Toast } from "@components/Toast";
import { TopBar } from "@components/TopBar";
import { UserLocationMapModal } from "@components/UserLocationMapModal";
import { useUserLocation } from "@hooks/useUserLocation";
import { requestUserLocation } from "@utils/getUserLocation";
import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const {
    latitude: initialLat,
    longitude: initialLon,
    locationServiceDenied: userLocationServiceDenied,
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
  const [openStreetMapError, setOpenStreetMapError] = useState<string | null>(
    null,
  );
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const handleRequestUserLocation = () => {
    requestUserLocation()
      .then((location) => {
        if (location) {
          setUserLocation(location);
        }
      })
      .catch((error) => {
        setToast({ message: "Device location not found", visible: true });
        console.error("Error getting user location:", error);
      });
  };

  useEffect(() => {
    if (initialLat != null && initialLon != null) {
      setUserLocation({ lat: initialLat, lon: initialLon });
    }
  }, [initialLat, initialLon]);

  useEffect(() => {
    if (!userLocation || !userLocation.lat || !userLocation.lon) return;

    setOpenStreetMapError(null);
    setLoading(true);
    fetchOSMOverpassAPI(userLocation.lat, userLocation.lon)
      .then((data) => {
        setRestaurantData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch restaurant data:", err);
        setOpenStreetMapError("Failed to fetch OpenStreetMap restaurant data");
      })
      .finally(() => setLoading(false));
  }, [userLocation]);

  const openUserLocationMapModal = () => setIsUserLocationMapModalOpen(true);
  const closeUserLocationMapModal = () => setIsUserLocationMapModalOpen(false);

  const getMainContentByState = () => {
    if (!userLocation && userLocationError) {
      console.error(userLocationError);
      return (
        <UserLocationError
          handleRequestUserLocation={handleRequestUserLocation}
          userLocationServiceDenied={userLocationServiceDenied}
          openUserLocationMapModal={openUserLocationMapModal}
        />
      );
    }

    if (openStreetMapError) {
      console.error(openStreetMapError);
      return <OpenStreetMapError />;
    }

    if (loading) {
      return <RestaurantListSkeleton />;
    }

    if (restaurantData.length === 0) {
      return (
        <RestaurantListEmpty
          openUserLocationMapModal={openUserLocationMapModal}
        />
      );
    }

    if (restaurantData.length > 0) {
      return <RestaurantList restaurantData={restaurantData} />;
    }

    return <UnexpectedError />;
  };

  return (
    <div className="app-container">
      <TopBar openUserLocationMapModal={openUserLocationMapModal} />
      <main className="main-content">{getMainContentByState()}</main>
      {isUserLocationMapModalOpen && (
        <UserLocationMapModal
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          setToast={setToast}
          onClose={closeUserLocationMapModal}
        />
      )}
      {toast.visible && (
        <Toast
          message={toast.message}
          onClose={() => setToast({ message: "", visible: false })}
        />
      )}
    </div>
  );
};

export default App;
