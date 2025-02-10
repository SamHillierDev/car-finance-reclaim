export interface MotorFinanceFormData {
  multipleAgreements: boolean | null;
  financeProvider: string;
  policyNumberKnown: boolean | null;
  policyNumber?: string;
  vehicleNumber: string;
  dealerOrBroker?: string;
  purchaseDate?: string;
}

export interface PersonalDetailsFormData {
  fullName: string;
  dateOfBirth: string;
  address: string;
  addressSameAsFinance: boolean | null;
  previousAddress?: string;
}

export type ToggleButtonGroupField =
  | keyof MotorFinanceFormData
  | keyof PersonalDetailsFormData;

export interface ToggleButtonGroupProps {
  label: string;
  name: ToggleButtonGroupField;
  value: boolean | null;
  onChange: (name: ToggleButtonGroupField, value: boolean) => void;
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
