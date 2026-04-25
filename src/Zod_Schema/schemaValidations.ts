import { z } from "zod";
import { ServiceStatus } from "../../GlobalTypes";

export const Authschema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type FormFields = z.infer<typeof Authschema>;

export const ServiceSchemaZod = z.object({
  ServiceName: z
    .string()
    .min(1, { message: "Service name is required" }) // not empty
    .min(10, { message: "Service name must be at least 10 characters" }), // length rule

  Description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters" }),
status: z.nativeEnum(ServiceStatus).optional(),
  category: z.string().optional(),
  deliverySpeed: z.string().optional(),
  suggestedPrice: z.string().optional(),
  estimatedTeamSize: z.string().optional(),
  pulseFrequency: z.string().optional(),
});

export type ServiceField = z.infer<typeof ServiceSchemaZod>;



// Users Zod Schema
export const UserSchema = z.object({
   id: z.string().optional(),
   fullName:z.string().optional(),
  country: z.string().min(5, "country is required "),
  firstName: z.string().min(5, "first Name is required and must be of more than 5 letters"),
  middleName: z.string().optional(),
  lastName: z.string().min(3, "last Name is required"),
  email:z.string().email().min(10, "Email is required" ),
  password:z.string().min(8, "Password is required"),
phone: z
  .string()
  .min(10, "Phone must be at least 10 digits")
  .regex(/^\+?[0-9\s-]{10,20}$/, "Invalid phone number format"),
  roleId: z.string().optional()

})

export type UserField = z.infer<typeof UserSchema>


// Building proposal Schema 

export const ProposalReviewSchema = z.object({
  id: z.string().optional(),
  service_id: z.string().optional(),
  client_id: z.string().optional(),
  contract_id: z.string().optional(),

  scope: z.string().min(1, "Scope is required"),
  deliverables: z.string().min(1, "Deliverables is required"),
  timeline: z.string().min(1, "Timeline is required, (eg. 2 weeks)"),
  pricing: z.number().nonnegative("Pricing must be a positive number"),
  termsAndConditions: z.string().min(1, "Terms and Conditions is required"),

status: z.enum([
  "PENDING",
  "APPROVED",
  "DECLINED",
  "NEGOTIATING",
  "ACCEPTED"
]),

});

export type ProposalZodField = z.infer<typeof ProposalReviewSchema>
