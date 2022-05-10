import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {authReducer, LoginActionsType} from './auth-reducer';
import {RegisActionsType, registrationReducer} from './registration-reducer';
import {ProfileActionsType, profileReducer} from './profile-reducer';
import {recoveryPasswordReducer} from './recovery-password-reducer';
import {newPasswordReducer} from './new-password-reducer';
import {useDispatch} from 'react-redux';
import {CardsActionsType, cardsReducer} from './cadrs-reducer';
import {PacksActionsType, packsReducer} from './packs-reducer';
import {paramsReducer} from './params-reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    registration: registrationReducer,
    recoveryPassword: recoveryPasswordReducer,
    newPassword: newPasswordReducer,
    cards: cardsReducer,
    packs: packsReducer,
    params: paramsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

//types
export type AppRootStateType = ReturnType<typeof rootReducer>//
//export type AppActionType = LoginActionsType | CardsActionsType | RegisActionsType
export type AppDispatch = typeof store.dispatch;//
export type AppActionType = LoginActionsType
    | PacksActionsType
    | ProfileActionsType
    | RegisActionsType
    | CardsActionsType
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

// @ts-ignore
window.store = store;