export const extractDietaryOptions = (tags: {
  [key: string]: string | undefined;
}): string[] => {
  const dietaryKeys = [
    "diet:vegetarian",
    "diet:vegan",
    "diet:halal",
    "diet:kosher",
    "diet:gluten_free",
    "diet:meat",
    "diet:non-vegetarian",
    "diet:lactose_free",
    "diet:pescetarian",
    "diet:dairy_free",
    "diet:sugar_free",
    "diet:lacto_vegetarian",
    "diet:ovo_vegetarian",
    "diet:fruitarian",
    "diet:raw",
  ];

  return dietaryKeys
    .filter((key) => tags[key] === "yes")
    .map((key) =>
      key
        .replace("diet:", "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    );
};
