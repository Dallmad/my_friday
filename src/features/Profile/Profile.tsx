import {Navigate} from 'react-router-dom';
import s from './Profile.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../state/store';
import {setProfileStateThunk} from '../../state/profile-reducer';
import {useEffect, useState} from 'react';
import {setUser} from '../../state/auth-reducer';
import EditableSpan from '../../components/EditableSpan/EditableSpan';
import {Preloader} from "../../components/Preloader/Preloader";
import {Logout} from "../../components/Logout/Logout";
import ava from '../../assets/images/avatar.jpg';
import icon from '../../assets/images/img_icon.png';
import Input from "../../components/Input/Input";

export const Profile = () => {

    const isLoading = useSelector<AppRootStateType, boolean>(state => state.registration.isLoading)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const userName = useSelector<AppRootStateType, string>((state) => state.profile.name)
    const dispatch = useTypedDispatch()

    const [newName, setNewName] = useState<string>(userName)

    useEffect(() => {
        dispatch(setUser())
    }, [userName])

    const changeName = () => {
        dispatch(setProfileStateThunk(newName))
    }

    if (isLoading) {
        return <Preloader/>
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
                    // label={'Email'}
                />

            </form>

            <div className={s.buttons_container}>
                <button className={s.button_cancel}>Cancel</button>
                <button className={s.button_save}>Save</button>
                <Logout/>
            </div>
        </div>
    )
}
