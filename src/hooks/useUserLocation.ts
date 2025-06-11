import { useState, useEffect } from "react";

interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  locationServiceDenied: boolean | null;
  error: string | null;
  loading: boolean;
}

export const useUserLocation = (): UserLocation => {
  const [location, setLocation] = useState<UserLocation>({
    latitude: null,
    longitude: null,
    locationServiceDenied: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported.",
      }));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 2 * 60000,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationServiceDenied: false,
          error: null,
          loading: false,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          locationServiceDenied: error.code === error.PERMISSION_DENIED,
          error: error.message,
          loading: false,
        }));
      },
      options,
    );
  }, []);

  return location;
};
