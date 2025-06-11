import { FilterModal } from "@components/FilterModal";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { RestaurantListSkeleton } from "@components/RestaurantList";
import { Toast } from "@components/Toast";
import { TopBar } from "@components/TopBar";
import { UserLocationMapModal } from "@components/UserLocationMapModal";
import { useRestaurant } from "@contexts/RestaurantContext";
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
    loading: userLocationLoading,
  } = useUserLocation();
  const {
    restaurantData,
    loading,
    openStreetMapError,
    userLocation,
    setUserLocation,
    isManualLocationSet,
    isUserLocationMapModalOpen,
    isFilterModalOpen,
  } = useRestaurant();

  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  useEffect(() => {
    if (initialLat != null && initialLon != null) {
      setUserLocation({ lat: initialLat, lon: initialLon });
    }
  }, [initialLat, initialLon, setUserLocation]);

  const getMainContentByState = () => {
    if (loading) {
      return <RestaurantListSkeleton />;
    }

    if (
      restaurantData.length > 0 &&
      userLocation &&
      !openStreetMapError &&
      (isManualLocationSet ||
        (!userLocationError && !userLocationServiceDenied))
    ) {
      return <RestaurantPage restaurantData={restaurantData} />;
    }

    return (
      <div className="centered-item-container">
        <ErrorPage
          userLocation={userLocation}
          userLocationError={userLocationError}
          userLocationServiceDenied={userLocationServiceDenied}
          openStreetMapError={openStreetMapError}
          restaurantData={restaurantData}
        />
      </div>
    );
  };

  return (
    <div className="app-container">
      <TopBar />
      {userLocationLoading ? (
        <div className="centered-item-container">
          <div className="loading-spinner-container">
            <LoadingSpinner />
            <h3 className="loading-text">Accessing device location</h3>
          </div>
        </div>
      ) : (
        <main className="main-content">{getMainContentByState()}</main>
      )}
      {isUserLocationMapModalOpen && (
        <UserLocationMapModal userLocation={userLocation} setToast={setToast} />
      )}
      {isFilterModalOpen && <FilterModal />}
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
