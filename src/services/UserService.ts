export interface User {
  id: number
  name: string
  email: string
  phone: string
}

export class UserData {
  constructor(private user: User) {}

  private formatName(name: string): string {
    return name.trim()
  }

  public build() {
    this.user.name = this.formatName(this.user.name)
    return this.user
  }
}

export const UserService = {
  async fetchUsers(): Promise<User[]> {
    try {
      const apiUrl = process.env.PUBLIC_API_URL
      if (!apiUrl) {
        throw new Error('API URL is not defined')
      }

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`)
      }

      const data: User[] = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: Expected an array')
      }

      const users: User[] = data.map((user: User) => {
        if (!user.id || !user.name || !user.email) {
          throw new Error('Invalid user data')
        }
        return new UserData(user).build()
      })

      return users
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  },
}
