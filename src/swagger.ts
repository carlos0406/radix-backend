import { SwaggerOptions } from '@fastify/swagger'
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui'

export const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: 'Equipment Reports API',
      description: 'API for managing equipment and reports',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Equipments', description: 'Endpoints related to equipment' },
      { name: 'Reports', description: 'Endpoints for managing reports' }
    ]
  }
}

export const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
}

export const equipmentSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' }
  }
}

export const reportSchema = {
  type: 'object',
  required: ['value', 'equipment_id', 'timestamp'],
  properties: {
    value: { type: 'number' },
    equipment_id: { type: 'string' },
    timestamp: { type: 'string', format: 'date-time' }
  }
}