import { z } from "zod";


export const CreateEquipmentReportSchema = z.object({
  value: z.number().min(0),         
  timestamp: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        const date = new Date(value);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return value; 
    },
    z.date()
  ),         
  equipment_id: z.string().uuid(),
});

export type CreateEquipmentReportInput = z.infer<typeof CreateEquipmentReportSchema>;