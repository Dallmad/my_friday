import {Navigate} from 'react-router-dom';
import s from './Profile.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../state/store';
import {setProfileStateThunk} from '../../state/profile-reducer';
import {useEffect, useState} from 'react';
import {setUser} from '../../state/auth-reducer';
import EditableSpan from '../../components/EditableSpan/EditableSpan';
import ava from '../../assets/images/avatar.jpg';
import icon from '../../assets/images/img_icon.png';
import Input from "../../components/Input/Input";

export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const userName = useSelector<AppRootStateType, string>((state) => state.profile.name)
    const userEmail = useSelector<AppRootStateType, string>((state) => state.profile.email)
    const dispatch = useTypedDispatch()

    const [newName, setNewName] = useState<string>(userName)

    useEffect(() => {
        dispatch(setUser())
    }, [newName])

    const changeName = () => {
        dispatch(setProfileStateThunk(newName))
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={s.div}>
            <div className={s.profile_name}>
                Personal Information
            </div>
            <div className={s.profile_img}>
                <img src={ava} alt="Avatar" className={s.profile_avatar}/>
                <div className={s.icon}>
                    <img src={icon} alt="Img-Icon" className={s.icon_img}/>
                </div>
            </div>
            <form className={s.profile_input}>
                <EditableSpan value={newName}
                              onChangeText={setNewName}
                              onBlur={changeName}
                              onEnter={changeName}
                />

                <Input
                     label={'email'}
                     value={userEmail}
                />

            </form>

            <div className={s.buttons_container}>
                <button className={s.button_cancel}>Cancel</button>
                <button className={s.button_save} onClick={changeName}>Save</button>
            </div>
        </div>
    )
}
