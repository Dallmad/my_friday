const initialState = {

}

export const newPasswordReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-NEW-PASSWORD':
            return state
        default:
            return state
    }
}
// actions
export const setNewPassword = () =>
    ({type: 'registration/SET-NEW-PASSWORD'} as const)

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setNewPassword>