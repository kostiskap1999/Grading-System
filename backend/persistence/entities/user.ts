export const Role = {
  ADMIN: 0,
  PROFESSOR: 1,
  STUDENT: 2,
  GUEST: 3
} as const

type Role = typeof Role[keyof typeof Role]

export class User {
  id: number
  username: string
  firstName: string
  lastName: string
  role: Role
  credentials?: Credentials
  
  constructor(user: any, credentials?: Credentials) {
    this.id = user.id
    this.username = user.username
    this.firstName = user.first_name
    this.lastName = user.last_name
    this.role = user.role
    this.credentials = credentials
  }
}

export class Credentials {
  id: number
  username: string
  password: string

  constructor(creds: any) {
    this.id = creds.id
    this.username = creds.username
    this.password = creds.password
  }
}
