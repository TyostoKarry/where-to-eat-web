const OSMOVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

export interface Restaurant {
  id: number;
  restaurantName: string;
  latitude: number;
  longitude: number;
  address?: string;
  cuisine?: string[];
  dietaryOptions?: string[];
  openingHours?: string;
  phoneNumber?: string;
  website?: string;
}

export const fetchOSMOverpassAPI = async (
  query: string
): Promise<Restaurant[]> => {
  try {
    const response = await fetch(OSMOVERPASS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.elements) {
      console.warn("No restaurant data found.");
      return [];
    }

    return data.elements
      .filter((node: any) => node.tags && node.tags.name)
      .map((node: any) => ({
        id: node.id,
        restaurantName: node.tags.name,
        latitude: node.lat,
        longitude: node.lon,
        address: node.tags["addr:street"] || "No Address",
        cuisine: node.tags.cuisine ? node.tags.cuisine.split(";") : [],
        dietaryOptions: node.tags.dietary ? node.tags.dietary.split(";") : [],
        openingHours: node.tags.opening_hours || "Unknown",
        phoneNumber: node.tags.phone || "No Phone",
        website: node.tags.website || null,
      }));
  } catch (error) {
    console.error("Failed to fetch restaurant data:", error);
    return [];
  }
};
