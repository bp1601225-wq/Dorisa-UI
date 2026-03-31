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
export interface ServiceRequest {
  id?: string
  userId: string
  serviceName: string
  date_created?: string
}


// Roles and Permissions

export interface RoleType {
  id?: string
  name: string
  status: "Active" | "In Active"
  created_at?: string
  createdAt?: string
}

// Services type




//  TYPES FOR CREATING A USER FOR ADMIN


export type RegistrationForm = IndividualForm | CorporateForm;

// // Auth

export interface AuthContextTypes {
  currentUser: PublicUser | null
  Login: (data: Record<string, unknown>) => Promise<PublicUser | null>
  Logout: () => void
}

export const ServiceStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  REQUESTED: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

// Service Name
export interface ServiceCatalog {
  id?: string
  clientId?: string
  ServiceName: string
  Description: string
  status?: typeof ServiceStatus[keyof typeof ServiceStatus];
  category?: string
  DateCreated?: Date 
  deliverySpeed?: string
  suggestedPrice?: string
  estimatedTeamSize?: string
  pulseFrequency?: string
}

