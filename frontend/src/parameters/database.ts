import { ICredentials } from "../interfaces/iCredentials"

export const HOSTNAME: string = 'http://localhost:3000'

export const LOGIN: string = '/login'
export const USERS: string = '/users'
export const USER: string = '/user'
export const SUBJECTS: string = '/subjects'
export const PROJECTS: string = '/projects'
export const SUBMISSIONS: string = '/submissions'
export const USERSUBJECTS: string = '/usersubjects'
export const USERPROJECTS: string = '/userprojects'


export const LOGINHEADERS = (credentials: ICredentials) => (
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    }
)

export const GETHEADERS = (token: string = "") => (
    {
        method: "GET",
        headers: {
          'token': token
        }
      }
)