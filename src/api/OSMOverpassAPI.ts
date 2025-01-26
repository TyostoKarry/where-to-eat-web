import { formatAddress } from "@utils/address";
import { calculateDistance } from "@utils/distance";
import { formatOpeningHours } from "@utils/openingHours";

const OSMOVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

export interface Restaurant {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
  address?: string;
  postalCode?: string;
  cuisine?: string[];
  dietaryOptions?: string[];
  openingHours?: string;
  phoneNumber?: string;
  website?: string;
}

export const fetchOSMOverpassAPI = async (
  userLat: number,
  userLon: number
): Promise<Restaurant[]> => {
  try {
    const query = `
    [out:json];
    node["amenity"~"restaurant|fast_food"](around:2000,${userLat},${userLon});
    out body;
    `;

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
      .map((node: any) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          node.lat,
          node.lon
        );

        return {
          id: node.id,
          name: node.tags.name,
          latitude: node.lat,
          longitude: node.lon,
          distance: distance,
          address: formatAddress(node.tags),
          postalCode: node.tags["addr:postcode"],
          cuisine: node.tags.cuisine ? node.tags.cuisine.split(";") : [],
          dietaryOptions: node.tags.dietary ? node.tags.dietary.split(";") : [],
          openingHours: formatOpeningHours(node.tags.opening_hours),
          phoneNumber: node.tags.phone,
          website: node.tags.website,
        };
      })
      .sort(
        (
          aRestaurant: { distance: number },
          bRestaurant: { distance: number }
        ) => aRestaurant.distance - bRestaurant.distance
      );
  } catch (error) {
    console.error("Failed to fetch restaurant data:", error);
    return [];
  }
};
