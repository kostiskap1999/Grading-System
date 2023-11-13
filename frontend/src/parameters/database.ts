import { ICredentials } from "../interfaces/iCredentials"

export const HOSTNAME: string = 'http://localhost:8000'

export const LOGIN: string = '/login'
export const USERS: string = '/users'
export const USER: string = '/user'
export const SUBJECTS: string = '/subjects'
export const SUPERVISINGSUBJECTS: string = '/supervising-subjects'
export const PROJECTS: string = '/projects'
export const USERPROJECTS: string = '/user-projects'
export const SUBJECTPROJECTS: string = '/subject-projects'
export const SUBMISSIONS: string = '/submissions'


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

export const POSTHEADERS = (data: object, token: string = "") => (
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(data)
      }
)
