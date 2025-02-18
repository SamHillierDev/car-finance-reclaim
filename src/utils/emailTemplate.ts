export const emailTemplate = (
  fullName: string,
  dateOfBirth: string,
  address: string,
  previousAddress?: string,
  vehicleNumber?: string,
  policyNumber?: string,
  dealerOrBroker?: string,
  purchaseDate?: string,
): string => {
  const financeReference = policyNumber ? `, reference ${policyNumber}` : "";

  const dealerInfo =
    dealerOrBroker && purchaseDate
      ? `Where/When I bought the vehicle:\n${dealerOrBroker} (${purchaseDate})\n`
      : dealerOrBroker
        ? `Where I bought the vehicle:\n${dealerOrBroker}\n`
        : "";

  return `Dear Sir/Madam,

On 11 January 2024, the Financial Conduct Authority launched an investigation into unfair historical motor finance commission arrangements. This has made me aware that I may have been caught out by this unfair practice. As I had a finance agreement with your firm, I am writing for clarification on the following two requests:

1. A request for information you hold on my behalf. I would like to ask if my finance agreement with you${financeReference} had any form of discretionary commission arrangement between you and the broker / car dealer or any other entity involved in the transaction. If it did, I request you inform me within one calendar month of the date of this communication.

For the sake of clarity, this first request is purely for information and is not a complaint or expression of dissatisfaction, and is not subject to the FCA’s pause. If there is failure to comply with my request, please treat this request as a data subject access request under the Data Protection Act 2018/GDPR.

2. If there is/was a discretionary commission arrangement in place in relation to my finance agreement with you, I request you treat this communication as a formal complaint arising out of the commission arrangement and the fact it was not adequately disclosed at the time it was taken out. The complaint should be treated as being made on the date of this communication. Please confirm to me within one calendar month that you have done so.

Details that may help you find my policy:

Name:
${fullName || "[Your Name]"}

Date of birth:
${dateOfBirth || "[Your DOB]"}

Current address:
${address || "[Your Address]"}

${policyNumber ? `Finance agreement policy number:\n${policyNumber}\n` : ""}
${vehicleNumber ? `Vehicle number plate(s):\n${vehicleNumber}\n` : ""}
${dealerInfo}
${previousAddress ? `My address when I had the finance this complaint relates to:\n${previousAddress}` : ""}

Yours sincerely,
${fullName || "[Your Name]"}
`;
};
