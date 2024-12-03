import Fastify from 'fastify'
import cors from '@fastify/cors'
import { equipmentReportRoutes } from '../equipment_report/equipment_report.routes'
import multipart from '@fastify/multipart'
import { equipmentRoutes } from '../equipment/equipment.routes'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { swaggerOptions, swaggerUiOptions } from '../../swagger'

const fastify = Fastify({
  logger: true,
  https: null,
})


fastify.register(swagger, swaggerOptions)
fastify.register(swaggerUi, swaggerUiOptions)
fastify.register(multipart)
fastify.register(equipmentReportRoutes)
fastify.register(equipmentRoutes)

fastify.register(cors,
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
    strictPreflight: false,
    preflight: false
  }
)


fastify.get('/', async function handler () {
  return { hello: 'world' }
})

fastify.listen({ 
  port: 3000,
  host: '0.0.0.0',
 }).then(() => {
  console.log('Server running on port 3000')
}).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
