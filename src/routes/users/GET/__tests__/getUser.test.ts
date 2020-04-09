import { getUser, GetUserContext } from '../getUser'

import { getManager } from 'typeorm'
jest.mock('typeorm')

/**
 * Mocking the User Entity
 */
jest.mock('@src/db', () => ({
  User: 'User Class Mock'
}))

const mockedGetManager = getManager as jest.Mock<unknown>

describe('getUser', () => {
  it('should call the entityManager with a User and id, when a param is set', async () => {
    const ctx = {
      params: {
        id: 1
      }
    } as GetUserContext
    const findOne = jest.fn()
    mockedGetManager.mockImplementation(() => ({
      findOne
    }))
    await getUser(ctx)
    expect(findOne).toHaveBeenCalledWith('User Class Mock', 1)
  })
  it('should set ctx body with user and status 200', async () => {
    const ctx = {
      params: {
        id: 1
      }
    } as GetUserContext
    mockedGetManager.mockImplementation(() => ({
      findOne: (): Promise<unknown> =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({
              id: 1,
              firstName: 'Sam',
              lastName: 'Tester'
            })
          }, 300)
        })
    }))
    await getUser(ctx)
    expect(ctx).toStrictEqual({
      params: {
        id: 1
      },
      body: {
        id: 1,
        firstName: 'Sam',
        lastName: 'Tester'
      },
      status: 200
    })
  })
  it('should set ctx status to 404 when no user is found', async () => {
    const ctx = {
      params: {
        id: 1
      }
    } as GetUserContext
    mockedGetManager.mockImplementation(() => ({
      findOne: (): Promise<undefined> =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(undefined)
          }, 300)
        })
    }))
    await getUser(ctx)
    expect(ctx).toStrictEqual({
      params: {
        id: 1
      },
      status: 404
    })
  })
  it('should set ctx status to 500 if entityManager throw an Error', async () => {
    /**
     * This test will throw an error
     * This is expected behavior and by spying on the console.log
     * we are suppressing logging the error for this test in the terminal
     * This will make the test results easier to read
     * since we are not overloading the output with unnecessary data
     */
    jest.spyOn(console, 'log').mockImplementation(() => null)
    const ctx = {
      params: {
        id: 1
      }
    } as GetUserContext
    mockedGetManager.mockImplementation(() => ({
      findOne: (): Promise<Error> =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error())
          }, 300)
        })
    }))
    await getUser(ctx)
    expect(ctx).toStrictEqual({
      params: {
        id: 1
      },
      status: 500
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
})
