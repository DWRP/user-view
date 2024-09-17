// src/services/UserService.test.ts
import { type User, UserData, UserService } from '@services/UserService'

global.fetch = jest.fn() as jest.Mock

const API_URL = 'https://jsonplaceholder.typicode.com/users'

const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  ...overrides,
})

const mockFetch = (
  response: Partial<Response>,
  data: unknown | null = null,
) => {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ...response,
    json: async () => data,
  })
}

describe('UserData Class', () => {
  test('should correctly format the name by removing extra spaces', () => {
    const user = createMockUser({ name: '  John Doe  ' })
    const formattedUser = new UserData(user).build()
    expect(formattedUser.name).toBe('John Doe')
  })

  test('should return the correctly formatted user', () => {
    const user = createMockUser({ name: 'Jane Smith', id: 2 })
    const formattedUser = new UserData(user).build()
    expect(formattedUser).toEqual({
      id: 2,
      name: 'Jane Smith',
      email: 'john@example.com',
      phone: '123-456-7890',
    })
  })
})

describe('UserService', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, PUBLIC_API_URL: API_URL }
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    process.env = ORIGINAL_ENV
    ;(console.error as jest.Mock).mockRestore()
    ;(console.warn as jest.Mock).mockRestore()
    jest.clearAllMocks()
  })

  test('should fetch and format users correctly', async () => {
    const mockUsers: User[] = [
      createMockUser({ id: 1, name: '  John Doe  ' }),
      createMockUser({
        id: 2,
        name: '  Jane Smith  ',
        email: 'jane@example.com',
        phone: '987-654-3210',
      }),
    ]

    mockFetch({ ok: true }, mockUsers)

    const users = await UserService.fetchUsers()

    const expectedUsers = mockUsers.map((user) => new UserData(user).build())

    expect(users).toEqual(expectedUsers)
    expect(global.fetch).toHaveBeenCalledWith(API_URL)
  })

  test('should return an empty array when the fetch fails', async () => {
    mockFetch({ ok: false, statusText: 'Internal Server Error' })

    const users = await UserService.fetchUsers()

    expect(users).toEqual([])
    expect(global.fetch).toHaveBeenCalledWith(API_URL)
  })

  test('should return an empty array if PUBLIC_API_URL is not defined', async () => {
    process.env.PUBLIC_API_URL = ''

    const users = await UserService.fetchUsers()

    expect(users).toEqual([])
    expect(global.fetch).not.toHaveBeenCalled()
  })

  test('should return an empty array when handling invalid data format', async () => {
    mockFetch({ ok: true }, { invalid: 'data' })

    const users = await UserService.fetchUsers()

    expect(users).toEqual([])
    expect(global.fetch).toHaveBeenCalledWith(API_URL)
  })

  test('should return an empty array when user data is invalid', async () => {
    const invalidUser = {
      name: 'Invalid User',
      email: 'invalid@example.com',
      phone: '000-000-0000',
    }
    const mockUsers: User[] = [createMockUser(), invalidUser as User]

    mockFetch({ ok: true }, mockUsers)

    const users = await UserService.fetchUsers()

    expect(users).toEqual([])
    expect(global.fetch).toHaveBeenCalledWith(API_URL)
  })
})
