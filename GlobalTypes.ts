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
  id?: string
  firstName?: string
  middleName?:string
  lastName?: string
}

export interface CorporateForm extends BaseForm {
companyName: string;
contactPerson: string;
industry: string;
companyWebsite?: string;
}

export type UserType = {
  id?:string
  roleId?: string 
} & (IndividualForm | CorporateForm);

export type PublicUser = Omit<UserType, "password">;


//  Request type 
export interface ServiceType {
  id?:string
  userId:string
  serviceName:string
  date_created:string
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

//  TYPES FOR CREATING A USER FOR ADMIN


export type RegistrationForm = IndividualForm | CorporateForm;

// // Auth

export interface AuthContextTypes {
  currentUser: PublicUser | null
  Login: (data: Record<string, unknown>) => Promise<PublicUser | null>
  Logout: () => void
}
