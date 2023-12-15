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