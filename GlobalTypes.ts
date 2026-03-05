interface BaseForm {
  id?: string;
  country: string;
  type: "INDIVIDUAL" | "CORPORATE";
}

export interface IndividualForm extends BaseForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface CorporateForm extends BaseForm {
  companyName: string;
  contactPerson: string;
  industry: string;
  email: string;
  phone: string;
  companyWebsite?: string;
  password: string;
}

export type RegistrationForm = IndividualForm | CorporateForm;

