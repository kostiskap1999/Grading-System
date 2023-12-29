import { logout } from './logout'

export const errorHandling = (err: Error) => {
    if (err instanceof TypeError && err.message.includes('NetworkError')) {
        console.error('NetworkError: There was a problem with the network. Please check your connection.')
        window.location.href = '/error?c=network'
        // logout()
        return
    }

    let error
    try {
        error = JSON.parse(err.message)
    } catch (jsonError) {
        console.error('Error parsing error:', jsonError)
        return
    }

    console.log(error.status)
    console.error(error.message)

    if (error.status === 401){}
        // logout()
    else if (error.status === 403) {
      // Handle 403 error
    } else if (error.status === 404) {
      // Handle 404 error
    } else {
      // Handle other errors
    }
}
