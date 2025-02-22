export const requestUserLocation = (): Promise<{
  lat: number;
  lon: number;
} | null> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
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
        alert("Unable to retrieve your location. Please try again.");
        reject(error);
      },
    );
  });
};
