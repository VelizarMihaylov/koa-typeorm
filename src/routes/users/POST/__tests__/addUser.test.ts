import { addUser } from '../addUser'
import { Context } from 'koa'

import { getConnection, getManager } from 'typeorm'
jest.mock('typeorm')

/**
 * Mocking the User Entity
 */
jest.mock('../../../../db', () => ({
  User: 'User Class Mock'
}))

const mockedGetConnection = getConnection as jest.Mock<unknown>
const mockedGetManager = getManager as jest.Mock<unknown>

describe('addUser', () => {
  it('should set ctx message and status to 400 when request has no body', async () => {
    const ctx = {
      request: {}
    } as Context
    await addUser(ctx)
    expect(ctx).toStrictEqual({
      request: {},
      message: 'Could not create User, missing request body!',
      status: 400
    })
  })
  it('should call the create method on the connection when firstName and LastName are set on the query', async () => {
    const ctx = {
      request: {
        body: {
          firstName: 'Sarah',
          lastName: 'Conner'
        }
      }
    } as Context
    const create = jest.fn()
    mockedGetConnection.mockImplementation(
      jest.fn(() => ({
        manager: {
          create
        }
      }))
    )
    mockedGetManager.mockImplementation(
      jest.fn(() => ({
        save: jest.fn()
      }))
    )
    await addUser(ctx)
    expect(create).toHaveBeenCalledWith('User Class Mock', {
      firstName: 'Sarah',
      lastName: 'Conner'
    })
  })
  it('should call the save method on the entity manager when the connection returns a user', async () => {
    const ctx = {
      request: {
        body: {
          firstName: 'Sarah',
          lastName: 'Conner'
        }
      }
    } as Context
    mockedGetConnection.mockImplementation(
      jest.fn(() => ({
        manager: {
          create: (): unknown => ({
            id: 1,
            firstName: 'Sarah',
            lastName: 'Conner'
          })
        }
      }))
    )
    const save = jest.fn()
    mockedGetManager.mockImplementation(
      jest.fn(() => ({
        save
      }))
    )
    await addUser(ctx)
    expect(save).toHaveBeenCalledWith({
      id: 1,
      firstName: 'Sarah',
      lastName: 'Conner'
    })
  })

  it('should set ctx message and status to 200 when successfully save a user', async () => {
    const ctx = {
      request: {
        body: {
          firstName: 'Sarah',
          lastName: 'Conner'
        }
      }
    } as Context
    mockedGetConnection.mockImplementation(
      jest.fn(() => ({
        manager: {
          create: jest.fn()
        }
      }))
    )
    const save = jest.fn()
    mockedGetManager.mockImplementation(
      jest.fn(() => ({
        save
      }))
    )
    await addUser(ctx)
    expect(ctx).toStrictEqual({
      request: {
        body: {
          firstName: 'Sarah',
          lastName: 'Conner'
        }
      },
      message: 'Successfully created user',
      status: 200
    })
  })

  it('should set ctx status to 500 if the connection throw', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => null)
    const ctx = {
      request: {
        body: {
          firstName: 'Sarah',
          lastName: 'Conner'
        }
      }
    } as Context
    mockedGetConnection.mockImplementation(
      jest.fn(() => ({
        manager: {
          create: new Error()
        }
      }))
    )
    await addUser(ctx)
    expect(ctx).toStrictEqual({
      request: {
        body: {
          firstName: 'Sarah',
          lastName: 'Conner'
        }
      },
      status: 500
    })
  })
  it('should set ctx status to 500 if the entity manager throw', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => null)
    const ctx = {
      request: {
        body: {
          firstName: 'Sarah',
          lastName: 'Conner'
        }
      }
    } as Context
    mockedGetManager.mockImplementation(
      jest.fn(() => ({
        save: new Error()
      }))
    )
    await addUser(ctx)
    expect(ctx).toStrictEqual({
      request: {
        body: {
          firstName: 'Sarah',
          lastName: 'Conner'
        }
      },
      status: 500
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
})
