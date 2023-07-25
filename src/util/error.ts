//The logic here is that after some point the messages will be different per error

export const errorHandling = (error: Error) => {
    if(error.message === "401")
        console.log(error)
    else if(error.message === "403")
        console.log(error)
    else if(error.message === "404")
        console.log(error)
    else if(error.message === "500"){
        console.log(error)
    }else{
        console.log(error)
    }        
}
