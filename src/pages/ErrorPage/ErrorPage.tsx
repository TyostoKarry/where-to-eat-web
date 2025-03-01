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
  handleRequestUserLocation: () => void;
}

export const ErrorPage: FC<ErrorPageProps> = ({
  userLocation,
  userLocationError,
  userLocationServiceDenied,
  openUserLocationMapModal,
  openStreetMapError,
  restaurantData,
  handleRequestUserLocation,
}) => {
  if (!userLocation && userLocationError) {
    console.error(userLocationError);
    return (
      <UserLocationError
        handleRequestUserLocation={handleRequestUserLocation}
        userLocationServiceDenied={userLocationServiceDenied}
        openUserLocationMapModal={openUserLocationMapModal}
      />
    );
  }

  if (openStreetMapError) {
    console.error(openStreetMapError);
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
