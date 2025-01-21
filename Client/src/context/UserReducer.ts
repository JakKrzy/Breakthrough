import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

export interface UserState {
    isLoggedIn: boolean
    nickname: string
    connection: HubConnection | null
}

type UserActionType = "LOGIN" | "LOGOUT" | "LOGINANON"

export interface UserAction {
    type: UserActionType
    payload: any
}

export const userReducer = ( state: UserState, action: UserAction ) => {
    switch (action.type) {
        case "LOGIN":
            return { isLoggedIn: true, nickname: action.payload.nickname, connection: null }
        case "LOGOUT":
            sessionStorage.clear()
            if (state.connection) state.connection.stop()
            return { isLoggedIn: false, nickname: "", connection: null }
        case "LOGINANON":
            if (state.connection) state.connection.stop()

            const connection = new HubConnectionBuilder()
                .withUrl(
                    `${import.meta.env.VITE_HOST}/anonUserHub`,
                    { accessTokenFactory: () => sessionStorage.getItem("accessToken") || "" })
                .withAutomaticReconnect()
                .build()
            return { isLoggedIn: true, nickname: action.payload.nickname, connection }
        default:
            return state
    }
}