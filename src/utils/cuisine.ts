export const extractCuisines = (tags: {
  [key: string]: string | undefined;
}): string[] => {
  return tags.cuisine
    ? tags.cuisine
        .split(";")
        .map((item) => item.replace("_", " "))
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    : [];
};
