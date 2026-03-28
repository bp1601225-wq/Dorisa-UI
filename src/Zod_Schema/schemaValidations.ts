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
  status: z
    .enum(Object.values(ServiceStatus) as [string, ...string[]])
    .optional(),
  category: z.string().optional(),
  deliverySpeed: z.string().optional(),
  suggestedPrice: z.string().optional(),
  estimatedTeamSize: z.string().optional(),
  pulseFrequency: z.string().optional(),
});

export type ServiceField = z.infer<typeof ServiceSchemaZod>;
