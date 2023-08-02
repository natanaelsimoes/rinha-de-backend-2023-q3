import Fastify from 'fastify'
import { AppDataSource } from './datasource'
import {
  GetContagemPessoas,
  GetPessoaHandler,
  GetPessoasHandler,
  PostPessoaHandler
} from './controller/PessoaController'
import {
  GetContagemPessoasRouteOptions,
  GetPessoaRouteOptions,
  GetPessoasRouteOptions,
  PostPessoaRouteOptions
} from './schema/PessoaSchema'

const fastify = Fastify({
  logger: true
})

fastify.post('/pessoas', PostPessoaRouteOptions, PostPessoaHandler)
fastify.get('/pessoas/:id', GetPessoaRouteOptions, GetPessoaHandler)
fastify.get('/pessoas', GetPessoasRouteOptions, GetPessoasHandler)
fastify.get('/contagem-pessoas', GetContagemPessoasRouteOptions, GetContagemPessoas)

void (async () => {
  try {
    await AppDataSource.initialize()
    await fastify.listen({ host: '0.0.0.0', port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})()
