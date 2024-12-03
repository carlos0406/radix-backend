import { FastifyInstance,FastifyRequest,FastifyReply } from "fastify"
import { EquipmentPrismaRepository } from "../../core/equipment/infra/db/prisma/prisma-equipment.repository"
import { ListEquipmentUseCase } from "../../core/equipment/application/usecases/list_equipment-usecase.ts/list_equipment.usecase"

export const equipmentRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {

  fastify.get('/equipments', async function handler (request:FastifyRequest, reply:FastifyReply) {
    const repository = new EquipmentPrismaRepository()
    const usecase = new ListEquipmentUseCase(repository)
    const equipments = await usecase.execute()
    return await reply.status(200).send({equipments})
  })


  done()
}