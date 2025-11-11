import { z } from "zod";

export const RequestCodeSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  language: z.string().optional(),
  context: z.literal("checkout"),
});

export type RequestCodeType = z.infer<typeof RequestCodeSchema>;
