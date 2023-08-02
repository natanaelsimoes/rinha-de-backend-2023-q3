import { type FastifyRequest, type RouteHandlerMethod } from 'fastify'
import { type GetPessoaParams, type GetPessoasQuerystring } from '../schema/PessoaSchema'
import { Pessoa } from '../entity/Pessoa'

export const PostPessoaHandler: RouteHandlerMethod = async (request: FastifyRequest<{ Body: Pessoa }>, reply) => {
  if (request.validationError != null) {
    return await reply
      .code(422)
      .send(request.validationError.message)
  }

  try {
    const pessoa = await Pessoa.create(request.body).save()
    return await reply
      .code(201)
      .header('Location', `/pessoas/${pessoa.id}`)
      .send()
  } catch (err) {
    return await reply
      .code(422)
      .send(err?.message)
  }
}

export const GetPessoaHandler: RouteHandlerMethod = async (request: FastifyRequest<{ Params: GetPessoaParams }>, reply) => {
  if (request.validationError != null) {
    return await reply
      .code(404)
      .send()
  }

  try {
    const pessoa = await Pessoa.findOneByOrFail({ id: request.params.id })
    return await reply
      .code(200)
      .send(pessoa)
  } catch (err) {
    return await reply
      .code(404)
      .send()
  }
}

export const GetPessoasHandler: RouteHandlerMethod = async (request: FastifyRequest<{ Querystring: GetPessoasQuerystring }>, reply) => {
  if (request.validationError != null) {
    return await reply
      .code(200)
      .send([])
  }

  const queryBuilder = Pessoa.createQueryBuilder()
  const searchTerm = request.query.t?.toLocaleLowerCase() ?? ''

  if (searchTerm.length > 0) {
    queryBuilder
      .addSelect(`'${searchTerm}' <<<-> search`, 'dist')
      .orderBy('dist')
  }

  const pessoas = await queryBuilder.take(50).getMany()

  return await reply
    .code(200)
    .send(pessoas)
}

export const GetContagemPessoas: RouteHandlerMethod = async (_, reply) => {
  const pessoas = await Pessoa.count()
  return await reply
    .code(200)
    .send(pessoas)
}
