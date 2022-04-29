const initialState = {

}

export const registrationReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/REGISTRATION':
            return state
        default:
            return state
    }
}
// actions
export const registration = () =>
    ({type: 'registration/REGISTRATION'} as const)

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof registration>