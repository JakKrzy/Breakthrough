export interface UserState {
    isLoggedIn: boolean
    nickname: string
}

type UserActionType = "LOGIN" | "LOGOUT"

export interface UserAction {
    type: UserActionType
    payload: any
}

export const userReducer = ( state: UserState, action: UserAction ) => {
    switch (action.type) {
        case "LOGIN":
            return { isLoggedIn: true, nickname: action.payload.nickname }
        case "LOGOUT":
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            return { isLoggedIn: false, nickname: "" }
        default:
            return state
    }
}