import { type ZodError, z } from 'zod'
import { ReportValidatorInterface } from './report.validator-interface'
import { EquipmentReport } from '../domain/equipment_report.entity'

const schema = z.object({
  id: z.string().uuid(),
  equipment_id: z.string().uuid(),
  timestamp: z.date(),
  value: z.number()
})

export const CategoryType = typeof schema

export class ZodReportValidator implements ReportValidatorInterface {
  validate(r: EquipmentReport) {
    try {
      schema.parse(r)
    } catch (error) {
      const validationErrors = error as ZodError
      validationErrors.errors.forEach((error) => {
        r.notification.addError({
          context: 'report',
          message: `${error.path.join('.')}:${error.message}`
        })
      })
    }
  }
}
