import { GeneratedEmailProps } from "../types/FormTypes";
import { generateComplaintText } from "../utils/constants";

const GeneratedEmail: React.FC<GeneratedEmailProps> = ({
  personalDetails,
  motorFinanceDetails,
}) => {
  const { fullName, dateOfBirth, address, previousAddress } = personalDetails;
  const {
    financeProvider,
    policyNumber,
    vehicleNumber,
    // dealerOrBroker,
    // purchaseDate,
  } = motorFinanceDetails;

  const complaintText = generateComplaintText(
    fullName,
    dateOfBirth,
    address,
    previousAddress,
    financeProvider,
    policyNumber,
    vehicleNumber,
    // dealerOrBroker,
    // purchaseDate,
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#C58F60]">Generated email</h2>
      <textarea
        className="w-full rounded-md border p-2 text-sm"
        rows={12}
        value={complaintText}
        readOnly
      />
    </div>
  );
};

export default GeneratedEmail;
