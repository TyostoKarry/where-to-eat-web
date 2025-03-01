import opening_hours from "opening_hours";

export const formatOpeningHours = (
  openingHoursString?: string,
): string | null => {
  if (!openingHoursString) return null;

  try {
    const oh = new opening_hours(openingHoursString);
    return oh.prettifyValue();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
