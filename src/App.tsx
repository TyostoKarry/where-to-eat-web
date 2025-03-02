import { fetchOSMOverpassAPI, Restaurant } from "@api/OSMOverpassAPI";
import { RestaurantListSkeleton } from "@components/RestaurantList";
import { Toast } from "@components/Toast";
import { TopBar } from "@components/TopBar";
import { UserLocationMapModal } from "@components/UserLocationMapModal";
import { useUserLocation } from "@hooks/useUserLocation";
import { ErrorPage } from "@pages/ErrorPage";
import { RestaurantPage } from "@pages/RestaurantPage";
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
  const [openStreetMapError, setOpenStreetMapError] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  useEffect(() => {
    if (initialLat != null && initialLon != null) {
      setUserLocation({ lat: initialLat, lon: initialLon });
    }
  }, [initialLat, initialLon]);

  useEffect(() => {
    if (!userLocation || !userLocation.lat || !userLocation.lon) {
      setLoading(false);
      return;
    }

    setOpenStreetMapError(false);
    setLoading(true);
    fetchOSMOverpassAPI(userLocation.lat, userLocation.lon)
      .then((data) => {
        setRestaurantData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch restaurant data:", err);
        setOpenStreetMapError(true);
      })
      .finally(() => setLoading(false));
  }, [userLocation]);

  const openUserLocationMapModal = () => setIsUserLocationMapModalOpen(true);
  const closeUserLocationMapModal = () => setIsUserLocationMapModalOpen(false);

  const getMainContentByState = () => {
    if (loading) {
      return <RestaurantListSkeleton />;
    }

    if (
      restaurantData.length > 0 &&
      userLocation &&
      !openStreetMapError &&
      !userLocationError &&
      !userLocationServiceDenied
    ) {
      return (
        <RestaurantPage
          restaurantData={restaurantData}
          openUserLocationMapModal={openUserLocationMapModal}
        />
      );
    }

    return (
      <div className="error-page-container">
        <ErrorPage
          userLocation={userLocation}
          userLocationError={userLocationError}
          userLocationServiceDenied={userLocationServiceDenied}
          openUserLocationMapModal={openUserLocationMapModal}
          openStreetMapError={openStreetMapError}
          restaurantData={restaurantData}
        />
      </div>
    );
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
