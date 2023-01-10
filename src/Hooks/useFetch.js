import {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

export const useFetch = (url, _options) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState('')
    const option = useRef(_options).current
    const navigate = useNavigate();
    

    useEffect( () => {
        console.log(option)
        const controller = new AbortController
        const fetchData = async () => {
            setIsPending(true)

            try {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type' : 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('access'),
                    }
                },
                     {
                    signal :controller.signal
                })

                if(!response.ok){
                    throw new Error (response.statusText)
                }
                const json = await response.json()


                console.log(response)
                
                setIsPending(false)
                setData(json)
                setError(null)
            } catch (err) {
                if (error.name === "AbortError"){
                    console.log("the fetch was aborted")
                } else {
                    setIsPending(false)
                    setError('Could not fetch the data')
                    console.log(error.message)
                }
                
            }
            
        }
        
        fetchData()
        return ()=>{
            controller.abort()

        }

    }, [url], option) 
    return {data, isPending, error}
}