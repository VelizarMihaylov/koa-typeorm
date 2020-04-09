import { getUsers, GetUsersContext } from '../getUsers'

import { usersMock } from '../__mocks__'

import { getRepository, Like } from 'typeorm'
jest.mock('typeorm')

/**
 * Mocking the User Entity
 */
jest.mock('@src/db', () => ({
  User: 'User Class Mock'
}))

const mockedGetRepository = getRepository as jest.Mock<unknown>
const mockedLike = Like as jest.Mock<unknown>

describe('getUser', () => {
  it('should call the entityManager with a User when called with context', async () => {
    const ctx = {
      query: {}
    } as GetUsersContext
    mockedGetRepository.mockImplementation(
      jest.fn(() => ({
        find: jest.fn()
      }))
    )
    await getUsers(ctx)
    expect(mockedGetRepository).toHaveBeenCalledWith('User Class Mock')
  })
  it('should call repository find method with firstName when the property is set on the query', async () => {
    const ctx = {
      query: {
        firstName: 'Sarah'
      }
    } as GetUsersContext
    const find = jest.fn()
    mockedGetRepository.mockImplementation(() => ({
      find
    }))
    mockedLike.mockImplementation(jest.fn(() => 'Sarah'))
    await getUsers(ctx)
    expect(find).toHaveBeenCalledWith({
      firstName: 'Sarah'
    })
  })
  it('should call repository find method with lastName when the property is set on the query', async () => {
    const ctx = {
      query: {
        lastName: 'Conner'
      }
    } as GetUsersContext
    const find = jest.fn()
    mockedGetRepository.mockImplementation(() => ({
      find
    }))
    mockedLike.mockImplementation(jest.fn(() => 'Conner'))
    await getUsers(ctx)
    expect(find).toHaveBeenCalledWith({
      lastName: 'Conner'
    })
  })
  it('should set ctx status to 200 and body with users data when the repository returns matches', async () => {
    const ctx = {
      query: {}
    } as GetUsersContext
    mockedGetRepository.mockImplementation(() => ({
      find: (): Promise<unknown> =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(usersMock)
          }, 300)
        })
    }))
    await getUsers(ctx)
    expect(ctx).toStrictEqual({
      query: {},
      status: 200,
      body: {
        data: usersMock
      }
    })
  })
  it('should set ctx status to 500 if the repository methods throw', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => null)
    const ctx = {
      query: {}
    } as GetUsersContext
    mockedGetRepository.mockImplementation(() => ({
      find: (): Promise<Error> =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error())
          }, 300)
        })
    }))
    await getUsers(ctx)
    expect(ctx).toStrictEqual({
      query: {},
      status: 500
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
})
