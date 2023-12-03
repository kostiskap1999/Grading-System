import Cookies from "universal-cookie"
import { ICredentials } from "../interfaces/iCredentials"

export const HOSTNAME: string = 'http://localhost:8000'

export const LOGIN: string = '/login'

export const TOKEN: string = '/token'

export const USERS: string = '/users'

export const SUBJECTS: string = '/subjects'
export const USERSUBJECTS: string = '/user-subjects'
export const SUPERVISINGSUBJECTS: string = '/supervising-subjects'

export const PROJECTS: string = '/projects'
export const USERPROJECTS: string = '/user-projects'
export const SUBJECTPROJECTS: string = '/subject-projects'

export const SUBMISSIONS: string = '/submissions'

export const TESTS: string = '/tests'

const cookies = new Cookies()

export const LOGINHEADERS = (credentials: ICredentials) => (
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    }
)

export const GETHEADERS = () => (
    {
        method: "GET",
        headers: {
          'token': cookies.get('token')
        }
      }
)

export const POSTHEADERS = (data: object) => (
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'token': cookies.get('token')
        },
        body: JSON.stringify(data)
      }
)
