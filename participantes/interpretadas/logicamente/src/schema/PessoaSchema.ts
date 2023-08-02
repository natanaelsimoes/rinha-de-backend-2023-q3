import { type RouteShorthandOptions } from 'fastify'

export const PessoaSchema = {
  type: 'object',
  required: ['apelido', 'nome', 'nascimento'],
  properties: {
    id: {
      type: 'string'
    },
    apelido: {
      type: 'string',
      minLength: 1,
      maxLength: 32
    },
    nome: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    nascimento: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$'
    },
    stack: {
      type: ['array', 'null'],
      items: {
        type: 'string',
        maxLength: 32
      }
    }
  }
}

export const PostPessoaRouteOptions: RouteShorthandOptions = {
  schema: {
    body: PessoaSchema
  },
  attachValidation: true
}

export const GetPessoaRouteOptions: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'string',
          pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
        }
      }
    },
    response: {
      200: PessoaSchema
    }
  },
  attachValidation: true
}

export interface GetPessoaParams {
  id: string
}

export const GetPessoasRouteOptions: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        t: {
          type: 'string'
        }
      }
    },
    response: {
      200: {
        type: 'array',
        items: PessoaSchema
      }
    }
  },
  attachValidation: true
}

export interface GetPessoasQuerystring {
  t?: string
}

export const GetContagemPessoasRouteOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'number'
      }
    }
  }
}
