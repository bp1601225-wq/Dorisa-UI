interface BaseForm {
id?: string;
country?: string;
email: string;
phone: string;
password: string;
type?: "INDIVIDUAL" | "CORPORATE";
}

export interface IndividualForm extends BaseForm {
fullName: string;
}

export interface CorporateForm extends BaseForm {
companyName: string;
contactPerson: string;
industry: string;
companyWebsite?: string;
}

export interface UserType {
user: IndividualForm | CorporateForm
roleId:string | "client"
}


//  Role
export interface Role {
  id:string,
  name: string
}
export type RegistrationForm = IndividualForm | CorporateForm;

// // Auth

export interface AuthContextTypes {
  currentUser: UserType | null
  Login: (data: {}) => Promise<UserType | null>
  Logout: () => void
}
