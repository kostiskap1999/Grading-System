//The logic here is that after some point the messages will be different per error

export const errorHandling = (err: Error) => {
    const error = JSON.parse(err.message)

    if(error.status === 401)
        console.error(error.message)
    else if(error.status === 403)
        console.error(error.message)
    else if(error.status === 404)
        alert(error.message + ". Try again.")
    else
        console.error(error.message)    
}
