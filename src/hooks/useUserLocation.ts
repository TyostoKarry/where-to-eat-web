import { useState, useEffect } from "react";

interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  locationServiceDenied: boolean | null;
  error: string | null;
}

export const useUserLocation = (): UserLocation => {
  const [location, setLocation] = useState<UserLocation>({
    latitude: null,
    longitude: null,
    locationServiceDenied: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationServiceDenied: false,
          error: null,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          locationServiceDenied: error.code === error.PERMISSION_DENIED,
          error: error.message,
        }));
      },
    );
  }, []);

  return location;
};
