import { ErrorCard } from "@components/ErrorCard";
import { LanguageContext } from "@contexts/LanguageContext";
import { FC, useContext } from "react";

export const UnexpectedError: FC = () => {
  const lang = useContext(LanguageContext);
  return (
    <ErrorCard
      errorTitle={lang.unexpectedError.title}
      errorMessage={lang.unexpectedError.message}
    />
  );
};
