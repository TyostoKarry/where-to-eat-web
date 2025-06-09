import { formatAddress } from "@utils/address";
import { extractCuisines } from "@utils/cuisine";
import { extractDietaryOptions } from "@utils/dietaryOptions";
import { calculateDistance } from "@utils/distance";
import { formatOpeningHours } from "@utils/openingHours";

const OSMOVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

interface OSMTags {
  name: string;
  "addr:street"?: string;
  "addr:housenumber"?: string;
  "addr:postcode"?: string;
  "addr:city"?: string;
  cuisine?: string;
  dietary?: string;
  opening_hours?: string;
  phone?: string;
  website?: string;
  [key: string]: string | undefined;
}

interface OSMNode {
  type: "node";
  id: number;
  lat: number;
  lon: number;
  tags: OSMTags;
}

interface OSMResponse {
  elements: OSMNode[];
}

export interface Restaurant {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  amenity: "restaurant" | "fast_food";
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
  userLon: number,
): Promise<Restaurant[]> => {
  try {
    const query = `
    [out:json];
    node["amenity"~"restaurant|fast_food"](around:10000,${userLat},${userLon});
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
        `HTTP Error: ${response.status} - ${response.statusText}`,
      );
    }

    const data = (await response.json()) as OSMResponse;

    if (!data.elements) {
      return [];
    }

    return data.elements
      .filter(
        (node: OSMNode) =>
          node.tags &&
          node.tags.name &&
          (node.tags.amenity === "restaurant" ||
            node.tags.amenity === "fast_food"),
      )
      .map((node: OSMNode) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          node.lat,
          node.lon,
        );

        const formattedHours = formatOpeningHours(node.tags.opening_hours);

        return {
          id: node.id,
          name: node.tags.name,
          latitude: node.lat,
          longitude: node.lon,
          amenity: node.tags.amenity as "restaurant" | "fast_food",
          distance: distance,
          address: formatAddress(node.tags),
          postalCode: node.tags["addr:postcode"],
          cuisine: extractCuisines(node.tags),
          dietaryOptions: extractDietaryOptions(node.tags),
          openingHours: formattedHours || undefined,
          phoneNumber: node.tags.phone,
          website: node.tags.website,
        };
      })
      .sort((a, b) => a.distance - b.distance);
  } catch (error) {
    throw new Error(`Failed to fetch restaurant data: ${error}`);
  }
};
