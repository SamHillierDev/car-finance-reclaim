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

export const getDateOfBirthError = (dob: string): string | undefined => {
  if (!dob) return "Date of birth is required";

  const birthDate = new Date(dob);
  const today = new Date();

  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  const adjustedAge =
    monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;

  if (adjustedAge < 18) return "You must be at least 18 years old";
  if (adjustedAge > 100) return "Age must be 100 years or younger";

  return undefined;
};
