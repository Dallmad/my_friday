import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {authReducer, LoginActionsType} from './auth-reducer';
import {profileReducer} from './profile-reducer';
import {registrationReducer} from './registration-reducer';
import {recoveryPasswordReducer} from './recovery-password-reducer';
import {newPasswordReducer} from './new-password-reducer';
import {useDispatch} from 'react-redux';
import {packsReducer} from './packs-reducer';
import {paramsReducer} from './params-reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    registration: registrationReducer,
    recoveryPassword: recoveryPasswordReducer,
    newPassword: newPasswordReducer,
    packs: packsReducer,
    params: paramsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

//types
export type AppRootStateType = ReturnType<typeof rootReducer>//
export type AppActionType = LoginActionsType
export type AppDispatch = typeof store.dispatch;//
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

// @ts-ignore
window.store = store;