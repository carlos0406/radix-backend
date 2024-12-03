import { type ZodError, z } from 'zod'
import { EquipmentValidatorInterface } from './equipment.validator-interface'
import { Equipment } from '../domain/equipment.entity'

const schema = z.object({
  id: z.string().uuid(),
  description: z.string().optional()
})

export const CategoryType = typeof schema

export class ZodReportValidator implements EquipmentValidatorInterface {
  validate(e: Equipment) {
    try {
      schema.parse(e)
    } catch (error) {
      const validationErrors = error as ZodError
      validationErrors.errors.forEach((error) => {
        e.notification.addError({
          context: 'equipment',
          message: `${error.path.join('.')}:${error.message}`
        })
      })
    }
  }
}
