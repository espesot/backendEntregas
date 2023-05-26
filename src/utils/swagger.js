import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion Proyecto Backend',
      description: 'endpoint de Carts y Productos',
      version: '1.0.0'
    }
  },
  apis: ['docs/**/*.yaml']
}

const specs = swaggerJSDoc(swaggerOptions)
export default specs