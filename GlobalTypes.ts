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


// Roles and Permissions

export interface RoleType {
  id?: string
  name: string
  status: "Active" | "In Active"
  created_at?: string
  createdAt?: string
}
export interface OptionType {
  label: string,
  value:string
}


export type RegistrationForm = IndividualForm | CorporateForm;

// // Auth

export interface AuthContextTypes {
currentUser:UserType | null
Login: (data:{}) => void
Logout: () => void
}
