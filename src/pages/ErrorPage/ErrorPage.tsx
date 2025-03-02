import { Restaurant } from "@api/OSMOverpassAPI";
import {
  OpenStreetMapError,
  RestaurantListEmpty,
  UnexpectedError,
  UserLocationError,
} from "@components/ErrorStates";
import { FC } from "react";

interface ErrorPageProps {
  userLocation: { lat: number; lon: number } | null;
  userLocationError: string | null;
  userLocationServiceDenied: boolean | null;
  openUserLocationMapModal: () => void;
  openStreetMapError: boolean;
  restaurantData: Restaurant[];
}

export const ErrorPage: FC<ErrorPageProps> = ({
  userLocation,
  userLocationError,
  userLocationServiceDenied,
  openUserLocationMapModal,
  openStreetMapError,
  restaurantData,
}) => {
  if (!userLocation || userLocationError) {
    return (
      <UserLocationError
        userLocationServiceDenied={userLocationServiceDenied}
        openUserLocationMapModal={openUserLocationMapModal}
      />
    );
  }

  if (openStreetMapError) {
    return <OpenStreetMapError />;
  }

  if (restaurantData.length === 0) {
    return (
      <RestaurantListEmpty
        openUserLocationMapModal={openUserLocationMapModal}
      />
    );
  }

  return <UnexpectedError />;
};
