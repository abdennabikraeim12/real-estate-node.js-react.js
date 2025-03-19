import { createContext, useContext, useReducer } from "react";
import AppReducer, { initialState } from "./AppReducer";

const GlobalContext = createContext();

const  GlobalProvider = ({children})=> {

    const [state,dispatch] =useReducer(AppReducer,initialState)

    return(
        <GlobalContext.Provider value={{basket:state.basket,user:state.user,dispatch:dispatch}}>
            
            {children}

        </GlobalContext.Provider>
    )

}


export  {GlobalProvider,GlobalContext}

export const useAuth = ()=>{
    return useContext(GlobalContext)
}