import { User } from '@src/db'
import { Context } from 'koa'
import { getManager } from 'typeorm'

export interface GetUserContext extends Context {
  params: {
    id: number
  }
  body: User
}

export const getUser = async (ctx: GetUserContext): Promise<void> => {
  const {
    params: { id }
  } = ctx
  try {
    const entityManager = getManager()
    const user = (await entityManager.findOne(User, id)) as User | undefined
    if (user) {
      ctx.body = {
        ...user
      }
      ctx.status = 200
    } else {
      ctx.status = 404
    }
  } catch (error) {
    console.log('ERROR ', error)
    ctx.status = 500
  }
}
