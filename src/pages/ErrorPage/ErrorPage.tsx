import { Restaurant } from "@api/OSMOverpassAPI";
import {
  OpenStreetMapError,
  RestaurantListEmpty,
  UnexpectedError,
  UserLocationError,
} from "@components/ErrorStates";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC } from "react";

interface ErrorPageProps {
  userLocation: { lat: number; lon: number } | null;
  userLocationError: string | null;
  userLocationServiceDenied: boolean | null;
  openStreetMapError: boolean;
  restaurantData: Restaurant[];
}

export const ErrorPage: FC<ErrorPageProps> = ({
  userLocation,
  userLocationError,
  userLocationServiceDenied,
  openStreetMapError,
  restaurantData,
}) => {
  const { isManualLocationSet } = useRestaurant();
  if (!userLocation || (!isManualLocationSet && userLocationError)) {
    return (
      <UserLocationError
        userLocationServiceDenied={userLocationServiceDenied}
      />
    );
  }

  if (openStreetMapError) {
    return <OpenStreetMapError />;
  }

  if (restaurantData.length === 0) {
    return <RestaurantListEmpty />;
  }

  return <UnexpectedError />;
};
