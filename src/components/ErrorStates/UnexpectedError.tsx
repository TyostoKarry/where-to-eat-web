import { ErrorCard } from "@components/ErrorCard";
import { FC } from "react";

export const UnexpectedError: FC = () => {
  return (
    <ErrorCard
      errorTitle="Something Went Wrong"
      errorMessage="An unexpected error occurred. Please refresh the page or try again later"
    />
  );
};
