import { EmailTemplateProps } from "../types/FormTypes";
import { emailTemplate } from "../utils/emailTemplate";

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  personalDetails,
  motorFinanceDetails,
}) => {
  const { fullName, dateOfBirth, address, previousAddress } = personalDetails;
  const { policyNumber, vehicleNumber, dealerOrBroker, purchaseDate } =
    motorFinanceDetails;

  const complaintText = emailTemplate(
    fullName,
    dateOfBirth,
    address,
    previousAddress,
    vehicleNumber,
    policyNumber,
    dealerOrBroker,
    purchaseDate,
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

export default EmailTemplate;
