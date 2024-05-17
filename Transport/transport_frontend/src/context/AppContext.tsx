import React, { createContext, useState } from 'react';

interface AppContext {
    children : React.ReactNode
}


export const AppContext = createContext<any>({})

export const AppProvider =({children}:AppContext)=>{
    const [auth,setAuth] = useState(false)

    return (
        <>
        <AppContext.Provider value={{auth,setAuth}} >
            {children}
        </AppContext.Provider>
        </>
    )


}