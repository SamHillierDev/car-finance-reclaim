export const isValidLicensePlate = (plate: string): boolean => {
  const regex = /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/;
  return regex.test(plate.toUpperCase());
};
