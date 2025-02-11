export const isValidLicensePlate = (plate: string): boolean => {
  const regex = /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/;
  return regex.test(plate.toUpperCase());
};

export const getLicensePlateError = (plate: string): string | undefined => {
  return isValidLicensePlate(plate)
    ? undefined
    : "Invalid license plate format (e.g., AB12 CDE)";
};

export const isValidFullName = (name: string): boolean => {
  const regex = /^[a-zA-Z]+(?:[-\s][a-zA-Z]+)+$/;
  return regex.test(name.trim());
};

export const getFullNameError = (name: string): string | undefined => {
  return isValidFullName(name)
    ? undefined
    : "Enter your full name (first and last name required, hyphens allowed)";
};
