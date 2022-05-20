const initialState = {}

export const recoveryPasswordReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-ANY':
            return state
        default:
            return state
    }
}
// actions
export const setAny = () =>
    ({type: 'registration/SET-ANY'} as const)

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setAny>