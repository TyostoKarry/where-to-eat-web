export const requestUserLocation = (): Promise<{
  lat: number;
  lon: number;
} | null> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported.");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Failed to fetch user location:", error);
        reject(error);
      },
    );
  });
};
