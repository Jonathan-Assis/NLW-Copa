import { createContext, ReactNode } from 'react';

interface UserProps {
    name: string;
    avatarUrl: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){

    async function signIn(){
        console.log('Acessando a conta!');
    }

    return(
        <AuthContext.Provider value={{
            signIn, 
            user: {
                name: 'John',
                avatarUrl: 'http://github.com/Jonathan-Assis.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}