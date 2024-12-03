import Fastify from 'fastify'
import cors from '@fastify/cors'
import { equipmentReportRoutes } from '../equipment_report/equipment_report.routes'
import multipart from '@fastify/multipart'
import { equipmentRoutes } from '../equipment/equipment.routes'

const fastify = Fastify({
  logger: true
})




fastify.register(multipart)
fastify.register(equipmentReportRoutes)
fastify.register(equipmentRoutes)

fastify.register(cors,
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
)


fastify.get('/', async function handler () {
  return { hello: 'world' }
})





fastify.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('Server running on port 3000')
}).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
