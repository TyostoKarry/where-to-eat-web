import { Restaurant, fetchOSMOverpassAPI } from "@api/OSMOverpassAPI";
import { ReactNode, useEffect, useMemo, useState } from "react";

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
  const [isManualLocationSet, setIsManualLocationSet] =
    useState<boolean>(false);

  // Filter state
  const [selectedAmenity, setSelectedAmenity] = useState<
    ("restaurant" | "fast_food")[]
  >([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState<
    string[]
  >([]);
  const [availableAmenity, setAvailableAmenity] = useState<
    ("restaurant" | "fast_food")[]
  >([]);
  const [availableCuisines, setAvailableCuisines] = useState<string[]>([]);
  const [availableDietaryOptions, setAvailableDietaryOptions] = useState<
    string[]
  >([]);

  // Modals
  const [isUserLocationMapModalOpen, setIsUserLocationMapModalOpen] =
    useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

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

  // Location handlers
  const handleSetUserLocationManually = (location: {
    lat: number;
    lon: number;
  }) => {
    setUserLocation(location);
    setIsManualLocationSet(true);
  };

  // Filter handlers
  const toggleAmenityFilter = (amenity: "restaurant" | "fast_food") => {
    setSelectedAmenity((previousAmenity) =>
      previousAmenity.includes(amenity)
        ? previousAmenity.filter(
            (existingAmenity) => existingAmenity !== amenity,
          )
        : [...previousAmenity, amenity],
    );
  };

  const toggleCuisineFilter = (cuisine: string) => {
    setSelectedCuisines((previousCuisines) =>
      previousCuisines.includes(cuisine)
        ? previousCuisines.filter(
            (existingCuisine) => existingCuisine !== cuisine,
          )
        : [...previousCuisines, cuisine],
    );
  };

  const toggleDietaryFilter = (option: string) => {
    setSelectedDietaryOptions((previousDietaryOptions) =>
      previousDietaryOptions.includes(option)
        ? previousDietaryOptions.filter(
            (existingOption) => existingOption !== option,
          )
        : [...previousDietaryOptions, option],
    );
  };

  const resetFilters = () => {
    setSelectedAmenity([]);
    setSelectedCuisines([]);
    setSelectedDietaryOptions([]);
  };

  useEffect(() => {
    const amenitySet = new Set<"restaurant" | "fast_food">();
    const cuisineSet = new Set<string>();
    const dietarySet = new Set<string>();

    restaurantData.forEach((restaurant) => {
      if (
        restaurant.amenity === "restaurant" ||
        restaurant.amenity === "fast_food"
      ) {
        amenitySet.add(restaurant.amenity);
      }
      restaurant.cuisine?.forEach((cuisine) => cuisineSet.add(cuisine));
      restaurant.dietaryOptions?.forEach((option) => dietarySet.add(option));
    });

    setAvailableAmenity(Array.from(amenitySet).sort());
    setAvailableCuisines(Array.from(cuisineSet).sort());
    setAvailableDietaryOptions(Array.from(dietarySet).sort());
  }, [restaurantData]);

  useEffect(() => {
    if (userLocation) {
      setAvailableCuisines([]);
      setAvailableDietaryOptions([]);
      resetFilters();
    }
  }, [userLocation]);

  const filteredRestaurants = useMemo(() => {
    return restaurantData.filter((restaurant) => {
      const matchesAmenity =
        selectedAmenity.length === 0 ||
        selectedAmenity.includes(restaurant.amenity);

      const matchesCuisines =
        selectedCuisines.length === 0 ||
        (restaurant.cuisine &&
          restaurant.cuisine.some((cuisine) =>
            selectedCuisines.includes(cuisine),
          ));

      const matchesDietaryOptions =
        selectedDietaryOptions.length === 0 ||
        (restaurant.dietaryOptions &&
          restaurant.dietaryOptions.some((option) =>
            selectedDietaryOptions.includes(option),
          ));

      return matchesAmenity && matchesCuisines && matchesDietaryOptions;
    });
  }, [
    restaurantData,
    selectedAmenity,
    selectedCuisines,
    selectedDietaryOptions,
  ]);

  // Modal handlers
  const openUserLocationMapModal = () => setIsUserLocationMapModalOpen(true);
  const closeUserLocationMapModal = () => setIsUserLocationMapModalOpen(false);
  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  const value = {
    restaurantData,
    loading,
    openStreetMapError,
    userLocation,
    setUserLocation,
    isManualLocationSet,
    handleSetUserLocationManually,
    selectedAmenity,
    selectedCuisines,
    selectedDietaryOptions,
    toggleAmenityFilter,
    toggleCuisineFilter,
    toggleDietaryFilter,
    resetFilters,
    availableAmenity,
    availableCuisines,
    availableDietaryOptions,
    filteredRestaurants,
    openUserLocationMapModal,
    closeUserLocationMapModal,
    isUserLocationMapModalOpen,
    openFilterModal,
    closeFilterModal,
    isFilterModalOpen,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
