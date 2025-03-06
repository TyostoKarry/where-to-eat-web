import { Restaurant } from "@api/OSMOverpassAPI";
import { createContext, useContext } from "react";

interface RestaurantContextType {
  // Restaurant data
  restaurantData: Restaurant[];
  loading: boolean;
  openStreetMapError: boolean;

  // User location
  userLocation: { lat: number; lon: number } | null;
  setUserLocation: (location: { lat: number; lon: number }) => void;
  isManualLocationSet: boolean;
  handleSetUserLocationManually: (location: {
    lat: number;
    lon: number;
  }) => void;

  // Modals
  openUserLocationMapModal: () => void;
  closeUserLocationMapModal: () => void;
  isUserLocationMapModalOpen: boolean;
}

export const RestaurantContext = createContext<
  RestaurantContextType | undefined
>(undefined);

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};
