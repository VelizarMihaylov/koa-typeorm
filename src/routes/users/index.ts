import { addUser } from './POST'
import { getUsers, getUser } from './GET'
import Router from 'koa-router'

const users = new Router()

/**
 * Set users endpoint routes and methods
 */

users
  .post('/users', addUser)
  .get('/users', getUsers)
  .get('/users/:id', getUser)

export default users
