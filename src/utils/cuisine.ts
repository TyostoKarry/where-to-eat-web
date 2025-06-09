export const extractCuisines = (tags: {
  [key: string]: string | undefined;
}): string[] => {
  if (!tags.cuisine) return [];

  const cleaned = tags.cuisine
    .split(";")
    .map((item) => item.trim().replace(/_/g, " ").toLowerCase())
    .filter((item) => item.length > 0);

  const unique = Array.from(new Set(cleaned));

  return unique
    .map((item) => item.replace(/\b\w/g, (char) => char.toUpperCase()))
    .sort((a, b) => a.localeCompare(b));
};
