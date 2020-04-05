import { User } from '../../../db'
import { Context } from 'koa'
import { getRepository, Like } from 'typeorm'

export interface GetUsersContext extends Context {
  query: {
    firstName?: string
    lastName?: string
  }
  body: {
    data: User[] | []
  }
}
export const getUsers = async (ctx: GetUsersContext): Promise<void> => {
  const {
    query: { firstName, lastName }
  } = ctx
  try {
    const userRepository = getRepository(User)
    const users = (await userRepository.find({
      ...(firstName && { firstName: Like(firstName) }),
      ...(lastName && { lastName: Like(lastName) })
    })) as User[] | []
    ctx.body = {
      data: users
    }
    ctx.status = 200
  } catch (error) {
    console.log('ERROR', error)
    ctx.status = 500
  }
}
