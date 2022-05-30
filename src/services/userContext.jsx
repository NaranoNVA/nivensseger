import React from 'react';

export const UserContext = React.createContext();

export default function AuthContext({children}){
    const [usuarioAtual, setUsuarioAtual] = React.useState("");
    
    return (
        <UserContext.Provider value={{usuarioAtual, setUsuarioAtual}}>
            {children}
        </UserContext.Provider>);
}