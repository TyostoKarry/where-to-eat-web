import { ErrorCard } from "@components/ErrorCard";
import { FC } from "react";

export const OpenStreetMapError: FC = () => {
  return (
    <ErrorCard
      errorTitle="Error Accessing OpenStreetMap API"
      errorMessage="Couldn't retrieve restaurant information from OpenStreetMap. This may be due to network issues or OpenStreetMap being temporarily unavailable. Please check your connection and try again later"
    />
  );
};
