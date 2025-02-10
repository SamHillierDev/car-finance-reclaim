export interface MotorFinanceFormData {
  multipleAgreements: string;
  financeProvider: string;
  policyNumberKnown: string;
  policyNumber?: string;
  vehicleNumber: string;
  dealerOrBroker?: string;
  purchaseDate?: string;
}

export interface PersonalDetailsFormData {
  fullName: string;
  dateOfBirth: string;
  address: string;
}

export type ToggleButtonGroupField =
  | keyof MotorFinanceFormData
  | keyof PersonalDetailsFormData;

export interface ToggleButtonGroupProps {
  label: string;
  name: ToggleButtonGroupField;
  value: string;
  onChange: (name: ToggleButtonGroupField, value: string) => void;
}

export interface MotorFinanceFormProps {
  formData: MotorFinanceFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  errors: { vehicleNumber?: string };
}

export interface PersonalDetailsFormProps {
  formData: PersonalDetailsFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
