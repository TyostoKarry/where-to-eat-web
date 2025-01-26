export const formatAddress = (
  restaurant: Record<string, string | undefined>
): string | undefined => {
  if (restaurant["addr:street"]) {
    let address = `${restaurant["addr:street"]}`;

    if (restaurant["addr:housenumber"]) {
      address += ` ${restaurant["addr:housenumber"]}`;
    }
    return address;
  }

  return undefined;
};
