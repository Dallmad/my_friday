import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from './auth-reducer';
import {profileReducer} from './profile-reducer';
import {registrationReducer} from './registration-reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    registration: registrationReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;