import { useState } from "react";
import { FaRegClipboard } from "react-icons/fa";
import { EmailTemplateProps } from "../types/FormTypes";
import { emailTemplate } from "../utils/emailTemplate";
import { financeProviders } from "../utils/financeProviders";

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  personalDetails,
  motorFinanceDetails,
}) => {
  const { fullName, dateOfBirth, address, previousAddress } = personalDetails;
  const {
    policyNumber,
    vehicleNumber,
    dealerOrBroker,
    purchaseDate,
    financeProvider,
  } = motorFinanceDetails;

  const [copied, setCopied] = useState(false);

  const selectedProvider = financeProviders.find(
    (provider) => provider.name === financeProvider,
  );

  const handleCopy = async () => {
    if (selectedProvider?.email) {
      await navigator.clipboard.writeText(selectedProvider.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
      <h2 className="text-xl font-semibold text-[#C58F60]">Email Template</h2>

      {selectedProvider?.email && (
        <div>
          <p>
            Below is the email address we have for your provider{" "}
            <strong>{financeProvider}</strong>:
          </p>
          <div className="flex items-center justify-between rounded-md border border-gray-300 bg-gray-100 p-2">
            <p className="font-mono text-sm text-blue-600">
              {selectedProvider.email}
            </p>
            <button
              onClick={handleCopy}
              className="ml-2 flex cursor-pointer items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-700 outline-gray-300 transition hover:bg-gray-300"
            >
              <FaRegClipboard className="text-lg" />{" "}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <textarea
        className="w-full rounded-md border p-2 text-sm"
        rows={12}
        value={complaintText}
        readOnly
      />

      <p className="mt-2 text-sm text-gray-600">
        <strong>P.S.</strong> This is the subject line we'd use:{" "}
        <span className="text-gray-800 italic">
          "Formal enquiry about my motor finance agreement
          {policyNumber ? `, ref. ${policyNumber}` : ""}"
        </span>
      </p>
    </div>
  );
};

export default EmailTemplate;
