// GlobalTypes.ts

// Type for Individual Registration
export interface IndividualForm {
  "Full Name": string;
  Email: string;
  Phone: string;
  Password: string;
  Country: string;
}

// Type for Corporate Registration
export interface CorporateForm {
  "Company Name": string;
  Industry: string;
  "Business Phone": string;
  "Contact Person": string;
  "Business Email": string;
  Country: string;
  "Company Website"?: string; // optional
}

// Union type for registration
export type RegistrationForm = IndividualForm | CorporateForm;

// Form type with ID for internal use (e.g., state + modal)
export type FormWithId = RegistrationForm & { id: string };