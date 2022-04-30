import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {authReducer, LoginActionsType} from './auth-reducer';
import {profileReducer} from './profile-reducer';
import {registrationReducer} from './registration-reducer';
import {recoveryPasswordReducer} from './recovery-password-reducer';
import {newPasswordReducer} from './new-password-reducer';
import {useDispatch} from 'react-redux';


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    registration: registrationReducer,
    recoveryPassword: recoveryPasswordReducer,
    newPassword: newPasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>//
export type AppActionType = LoginActionsType
export type AppDispatch = typeof store.dispatch;//
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
//export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;