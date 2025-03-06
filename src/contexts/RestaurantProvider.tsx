import { Restaurant, fetchOSMOverpassAPI } from "@api/OSMOverpassAPI";
import { ReactNode, useEffect, useState } from "react";

import { RestaurantContext } from "./RestaurantContext";

interface RestaurantProviderProps {
  children: ReactNode;
}

export const RestaurantProvider = ({ children }: RestaurantProviderProps) => {
  // Restaurant data state
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openStreetMapError, setOpenStreetMapError] = useState<boolean>(false);

  // Location state
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  // Modals
  const [isUserLocationMapModalOpen, setIsUserLocationMapModalOpen] =
    useState<boolean>(false);

  // Fetch restaurant data when user location changes
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

  // Modal handlers
  const openUserLocationMapModal = () => setIsUserLocationMapModalOpen(true);
  const closeUserLocationMapModal = () => setIsUserLocationMapModalOpen(false);

  const value = {
    restaurantData,
    loading,
    openStreetMapError,
    userLocation,
    setUserLocation,
    openUserLocationMapModal,
    closeUserLocationMapModal,
    isUserLocationMapModalOpen,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
