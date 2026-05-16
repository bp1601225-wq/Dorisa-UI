interface BaseForm {
id?: string;
country?: string;
email: string;
phone: string;
password: string;
type?: "INDIVIDUAL" | "CORPORATE";
}



export interface IndividualForm extends BaseForm {
fullName?: string;
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
    firstName?: string
  middleName?:string
  lastName?:string

  id?:string
  roleId?: string 
  role?:string
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
  isAuthReady: any
  token: string | null
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


// Proposal Catalog
export type ProposalStatus = "PENDING" | "APPROVED" | "DECLINED"
| "NEGOTIATING" | "ACCEPTED"


type ServiceRequestStatus = "DRAFT"


  // Client Adding services to create a proposal
export interface ClientServiceRequest {
  id?:string
  clientId:string,
  serviceId:string
request_status: ServiceRequestStatus
}


// Admin prepares a proposal to be sent to client for review
export interface Proposal {
  id?: string;

client_request_id: string
  
  service_id: string;
  client_id: string;
  contract_id?: string;
  scope:string, 
  deliverables:string
  versions?:ProposalVersionType[]
  timeline: string;
  pricing: number;
  status: ProposalStatus
  termsAndConditions: string;
}


// Project
export interface ProjectType {
  id?: string;

  service_id: string;
  proposal_id: string;
   client_request_id:string
  client_id: string;

  title?: string;
  progress?: number;

  projectStatus: "PLANNING" | "ACTIVE" | "COMPLETED" | "IN_PROGRESS";

  service?: ServiceCatalog;
  client?: UserType;
  proposal?: Proposal;

  MileStone?: MilestoneType[]

}


export interface MilestoneType  {
  id?: string;
  projectId:string;
  title: string;
  description: string;
  amount: number;
  status: "pending" | "completed";
  dateCreated?: string
};


export interface NegotiationType {
  id?:string,
  serviceId:string
  clientId:string,
    client_request_id:string
  proposal_id:string
 NegotiatingText:string
  created_at?:string
}

export interface ProposalVersionType {
  id?: string;
  proposalId: string;
  clientId: string;
  serviceId: string;
  version: number;
  message: string;
  amount: number;
}



