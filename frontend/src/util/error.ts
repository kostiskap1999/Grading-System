//The logic here is that after some point the messages will be different per error

import { logout } from "./logout"

export const errorHandling = (err: Error) => {
    const error = JSON.parse(err.message)
    console.log(error.status)
    console.error(error.message)

    if(error.status === 401)
        logout()
    else if(error.status === 403) {}
    else if(error.status === 404) {}
    else {}

}
