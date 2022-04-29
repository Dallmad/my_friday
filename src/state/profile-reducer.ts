const initialState = {

}

export const profileReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/SET-ANY':
            return state
        default:
            return state
    }
}
// actions
export const setAny = () =>
    ({type: 'profile/SET-ANY'} as const)

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setAny>