export const formatOpeningHours = (
  openingHoursString?: string,
): string | null => {
  if (!openingHoursString) return null;

  try {
    const parts = openingHoursString
      .split(";")
      .map((part) => part.trim())
      .filter((part) => part.length > 0);

    return parts.length > 0 ? parts.join("; ") : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
