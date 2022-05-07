import {Navigate} from 'react-router-dom';
import s from './Profile.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../state/store';
import {setProfileStateThunk} from '../../state/profile-reducer';
import {useEffect, useState} from 'react';
import {authReducer, login, setIsLoggedIn, setUser} from '../../state/auth-reducer';
import EditableSpan from '../../components/EditableSpan/EditableSpan';
import ava from '../../assets/images/ava.png'
import {Logout} from "../../components/Logout/Logout";
import {authAPI} from "../../api/auth-api";

export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const userName = useSelector<AppRootStateType, string>((state) => state.profile.name)
    const dispatch = useTypedDispatch()

    const [newName, setNewName] = useState<string>(userName)

    const changeName = () => {
        dispatch(setProfileStateThunk(newName))
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={s.div}>
            <div>
                Profile
                <div>
                    <img src={ava} alt="Avatar"/>
                </div>
                <EditableSpan   value={newName}
                                onChangeText={setNewName}
                                onBlur={changeName}
                                onEnter={changeName}
                />
                <Logout/>
            </div>
        </div>
    )
}
