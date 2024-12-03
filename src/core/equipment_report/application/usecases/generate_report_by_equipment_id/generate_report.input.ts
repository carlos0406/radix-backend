import { z } from "zod";

export const GenerateReportSchema = z.object({
  equipment_id: z.string().uuid(),
  hours: z.string().transform((val) => Number(val)).refine((val) => !isNaN(val), {
    message: 'Hours must be a valid number',
  }).pipe(z.number().min(0)),
  
});

export type GenerateReportInput = z.infer<typeof GenerateReportSchema>;