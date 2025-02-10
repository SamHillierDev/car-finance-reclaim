export const motorFinanceProviders = [
  { name: "Select your provider", warning: false },
  { name: "Admiral", warning: true },
  { name: "Advantage Finance", warning: true },
  { name: "Aldermore", warning: false },
  { name: "Alphera", warning: false },
  { name: "Audi (VW Financial Services)", warning: false },
  { name: "Autolend", warning: true },
  { name: "Bamboo", warning: false },
  { name: "Barclays Partner Finance", warning: false },
  { name: "Billing Finance", warning: true },
  { name: "Black Horse", warning: false },
  { name: "Blue Motor Finance", warning: false },
  { name: "BMW Financial Services (inc. Mini)", warning: false },
  { name: "CA Auto Finance", warning: false },
  { name: "CarCashPoint", warning: true },
  { name: "CarFinance 247", warning: false },
  { name: "CarMoney", warning: false },
  { name: "Carmoola", warning: true },
  { name: "Close Brothers", warning: false },
  { name: "FCA Automotive", warning: false },
  { name: "Finio Loans", warning: false },
  { name: "First Response Finance", warning: true },
  { name: "Ford Credit Europe (FCE)", warning: false },
  { name: "Hitachi Capital (Novuna)", warning: false },
  { name: "Honda Financial Services", warning: false },
  { name: "Hyundai Finance", warning: false },
  { name: "JBR Capital", warning: false },
  { name: "Kia Finance", warning: false },
  { name: "Lendable", warning: true },
  { name: "Lombard Asset Finance", warning: false },
  { name: "Mallard Finance", warning: true },
  { name: "Mann Island Finance", warning: false },
  { name: "Marsh Finance", warning: false },
  { name: "Mercedes-Benz Financial Services", warning: false },
  { name: "Mobilize", warning: false },
  { name: "Moneybarn", warning: true },
  { name: "Moneyway", warning: false },
  { name: "MotoNovo", warning: false },
  { name: "MotorKitty", warning: false },
  { name: "Northridge", warning: false },
  { name: "Novuna", warning: false },
  { name: "Oodle Car Finance", warning: true },
  { name: "Oplo", warning: true },
  { name: "Paragon", warning: false },
  { name: "PCF Bank", warning: false },
  { name: "PSA (Stellantis)", warning: false },
  { name: "RCI (now Mobilize)", warning: false },
  { name: "Santander", warning: false },
  { name: "Shawbrook", warning: false },
  { name: "Specialist Motor Finance", warning: true },
  { name: "Startline Motor Finance", warning: false },
  { name: "Stellantis", warning: false },
  { name: "Tandem", warning: true },
  { name: "Toyota Financial Services", warning: false },
  { name: "V12 Vehicle Finance", warning: true },
  { name: "Vauxhall Finance", warning: false },
  { name: "Volkswagen Financial Services", warning: false },
  { name: "Volvo Car Financial Services", warning: false },
  { name: "Zopa", warning: false },
];

export const generateComplaintText = (
  fullName: string,
  dateOfBirth: string,
  address: string,
  previousAddress?: string,
  // financeProvider?: string,
  // policyNumber?: string,
  vehicleNumber?: string,
  dealerOrBroker?: string,
  purchaseDate?: string,
): string => `Dear Sir/Madam,

On 11 January 2024, the Financial Conduct Authority launched an investigation into unfair historical motor finance commission arrangements. This has made me aware that I may have been caught out by this unfair practice. As I had a finance agreement with your firm, I am writing for clarification on the following two requests:

1. A request for information you hold on my behalf. I would like to ask if my finance agreement with you (details below) had any form of discretionary commission arrangement between you and the broker / car dealer or any other entity involved in the transaction. If it did, I request you inform me within one calendar month of the date of this communication.

For the sake of clarity, this first request is purely for information and is not a complaint or expression of dissatisfaction, and is not subject to the FCA’s pause. If there is failure to comply with my request, please treat this request as a data subject access request under the Data Protection Act 2018/GDPR.

2. If there is/was a discretionary commission arrangement in place in relation to my finance agreement with you, I request you treat this communication as a formal complaint arising out of the commission arrangement and the fact it was not adequately disclosed at the time it was taken out. The complaint should be treated as being made on the date of this communication. Please confirm to me within one calendar month that you have done so.

Details that may help you find my policy:

Name: 
${fullName || "[Your Name]"}

Date of birth:
${dateOfBirth || "[Your DOB]"}

Current address:
${address || "[Your Address]"}

Vehicle number plate(s):
${vehicleNumber || "[Vehicle Number]"}

${dealerOrBroker ? `Where/When I bought the vehicle:
${dealerOrBroker}` : ""} ${purchaseDate ? `(${purchaseDate})` : ""}

${previousAddress ? `My address when I had the finance this complaint relates to:
${previousAddress}` : ""}

Yours sincerely,  
${fullName || "[Your Name]"}`;
