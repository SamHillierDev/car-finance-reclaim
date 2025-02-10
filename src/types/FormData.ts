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
