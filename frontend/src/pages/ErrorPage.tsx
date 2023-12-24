import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ErrorPage() {
    const [params] = useSearchParams()

    const [text, setText] = useState<string>("")
    
    useEffect(() => {
        const relativeUrl = window.location.pathname
        if(window.location.pathname === '/error'){
            const parsedErrorCode: string = (params.get('c') === null) ? "" : params.get('c')!.toString()
            if(parsedErrorCode === '404')
                setText('404 Not Found')
            else if(parsedErrorCode === 'network')
                setText('The server is busy or down. Try again later.')
            else
                setText('An unprecedented error has occured. Try again later.')
        }
            

    }, [])

  return (
    <div>{text}</div>
  )
}