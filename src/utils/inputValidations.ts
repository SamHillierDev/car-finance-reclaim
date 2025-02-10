export const isValidLicensePlate = (plate: string): boolean => {
  const regex = /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/;
  return regex.test(plate.toUpperCase());
};

export const getLicensePlateError = (plate: string): string | undefined => {
  return isValidLicensePlate(plate)
    ? undefined
    : "Invalid license plate format (e.g., AB12 CDE)";
};
