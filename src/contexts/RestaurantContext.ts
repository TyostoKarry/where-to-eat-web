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

  // Filters
  selectedAmenity: ("restaurant" | "fast_food")[];
  selectedCuisines: string[];
  selectedDietaryOptions: string[];
  toggleAmenityFilter: (amenity: "restaurant" | "fast_food") => void;
  toggleCuisineFilter: (cuisine: string) => void;
  toggleDietaryFilter: (option: string) => void;
  resetFilters: () => void;
  availableAmenity: ("restaurant" | "fast_food")[];
  availableCuisines: string[];
  availableDietaryOptions: string[];

  // Modals
  openUserLocationMapModal: () => void;
  closeUserLocationMapModal: () => void;
  isUserLocationMapModalOpen: boolean;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  isFilterModalOpen: boolean;
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
