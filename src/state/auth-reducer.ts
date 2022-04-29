
const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return state
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = () =>
    ({type: 'login/SET-IS-LOGGED-IN'} as const)

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedInAC>