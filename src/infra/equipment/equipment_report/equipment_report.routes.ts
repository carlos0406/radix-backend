import { EquipmentReportPrismaRepository } from '../../core/equipment_report/infra/db/prisma/equipment_report.prisma.repository';
import { EquipmentPrismaRepository } from '../../core/equipment/infra/db/prisma/prisma-equipment.repository';
import { FastifyInstance,FastifyRequest,FastifyReply } from "fastify"
import { CreateEquipmentReportUsecase } from '../../core/equipment_report/application/usecases/create_equipment_report/create-equipment_report.usecase';
import { CreateEquipmentReportInput } from '../../core/equipment_report/application/usecases/common/create-equipment_report.input';
import { CreateEquipmentReportWithCsvUsecase } from '../../core/equipment_report/application/usecases/create_equipment_report_with_csv/create-equipment_report_with_csv.usecase';
import { GenerateReportSchema } from '../../core/equipment_report/application/usecases/generate_report_by_equipment_id/generate_report.input';
import { GenerateEquipmentReport } from '../../core/equipment_report/application/usecases/generate_report_by_equipment_id/generate_report_by_equipment_id.usecase';


export const equipmentReportRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {

  fastify.get('/reports', async function handler (request:FastifyRequest, reply:FastifyReply) {
    const input = GenerateReportSchema.parse(request.query)
    const equipmentReportRepository = new EquipmentReportPrismaRepository()
    const useCase = new GenerateEquipmentReport(equipmentReportRepository);
    const reports = await useCase.execute(input)
    const medium_value = reports.reduce((acc, report) => acc +report.value,0)/reports.length
    return await reply.status(200).send({reports, medium_value})
  })

  fastify.post('/reports', async function handler (request:FastifyRequest, reply:FastifyReply) {
    const equipmentRepository = new EquipmentPrismaRepository()
    const equipmentReportRepository = new EquipmentReportPrismaRepository()
    const usecase = new CreateEquipmentReportUsecase(equipmentReportRepository, equipmentRepository)
    const id = await usecase.execute(request.body as CreateEquipmentReportInput)
    return await reply.status(201).send({id}) 
  })
  fastify.post('/reports/csv', async function handler (request:FastifyRequest, reply:FastifyReply) {
    const equipmentRepository = new EquipmentPrismaRepository()
    const equipmentReportRepository = new EquipmentReportPrismaRepository()
    const usecase = new CreateEquipmentReportWithCsvUsecase(equipmentReportRepository, equipmentRepository)
    const data = await request.file()
    const fileBuffer = await data?.toBuffer()
    if (!fileBuffer) {
      return await reply.status(400).send({ message: 'No file uploaded' })
    }
    const id = await usecase.execute(fileBuffer)
    return await reply.status(201).send({id}) 
  })
  done()
}