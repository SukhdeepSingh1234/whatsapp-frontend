import React, { createContext, useEffect, useRef, useState } from 'react'
import {io} from 'socket.io-client'

export const AccountContext = createContext(null)

function Context({children}) {

    const [person,setPerson]= useState({})
    const [loggedId,setLoggedId]= useState("");
    const [latestmsg,setLatestmsg]= useState("")
    const socket=useRef()

    useEffect(()=>{
        socket.current=io("ws://localhost:9000")
    },[])

    return (
        <AccountContext.Provider value={{
            person,
            setPerson,
            loggedId,
            setLoggedId,
            latestmsg,
            setLatestmsg,
            socket
        }}>
            {children}
        </AccountContext.Provider>
    )
}

export default Context
