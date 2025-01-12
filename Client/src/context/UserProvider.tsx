import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { UserAction, userReducer, UserState } from './UserReducer';

const initUserState: UserState = {
    isLoggedIn: false,
    nickname: ""
}

interface UserContextType {
    userState: UserState;
    userDispatch: React.Dispatch<UserAction>
}

export const UserContext = createContext<UserContextType>({
    userState: initUserState,
    userDispatch: () => undefined
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userState, userDispatch] = useReducer(userReducer, initUserState)

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider")
    }
    return context
}

export default UserProvider
