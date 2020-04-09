import { User } from '@src/db'
import { Context } from 'koa'
import { getConnection, getManager } from 'typeorm'

type RequestBody = {
  request: {
    body?: {
      firstName?: string
      lastName?: string
    }
  }
}

export const addUser = async (ctx: Context): Promise<void> => {
  const {
    request: { body }
  } = ctx as RequestBody
  if (!body) {
    ctx.status = 400
    ctx.message = 'Could not create User, missing request body!'
    return
  }
  const { firstName, lastName } = body
  if (firstName && lastName) {
    try {
      const connection = getConnection()
      const entityManager = getManager()
      const user = connection.manager.create(User, {
        firstName,
        lastName
      })
      await entityManager.save(user)
      ctx.status = 200
      ctx.message = 'Successfully created user'
    } catch (error) {
      console.log('ERROR', error)
      ctx.status = 500
    }
    return
  }
  ctx.status = 400
  ctx.message = 'Could not create User, missing property!'
}
