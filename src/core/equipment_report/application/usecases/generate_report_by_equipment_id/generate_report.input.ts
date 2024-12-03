import { z } from "zod";

export const GenerateReportSchema = z.object({
  equipment_id: z.string().uuid(),
  hours: z.number().min(0),
  
});

export type GenerateReportInput = z.infer<typeof GenerateReportSchema>;