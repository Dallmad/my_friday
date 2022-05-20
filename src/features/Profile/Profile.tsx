import {Navigate} from 'react-router-dom';
import s from './Profile.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../state/store';
import {setProfileStateThunk} from '../../state/profile-reducer';
import {useEffect, useState} from 'react';
import {setUser} from '../../state/auth-reducer';
import ava from '../../assets/images/ava.png';
import icon from '../../assets/images/img_icon.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export const Profile = () => {

    const dispatch = useTypedDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const userName = useSelector<AppRootStateType, string>((state) => state.profile.name)
    const userEmail = useSelector<AppRootStateType, string>((state) => state.profile.email)
    const avatar = useSelector<AppRootStateType, string>((state) => state.profile.avatar)

    const [newName, setNewName] = useState<string>(userName)

    useEffect(() => {
        dispatch(setUser())
        setNewName(userName)
    }, [userName])

    const changeName = () => {
        dispatch(setProfileStateThunk(newName))
    }

    const cancelChangeName = () => {
        setNewName(userName)
        dispatch(setProfileStateThunk(userName))
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
                <img src={avatar?avatar: ava} alt="Avatar" className={s.profile_avatar}/>
                <div className={s.icon}>
                    <img src={icon} alt="Img-Icon" className={s.icon_img}/>
                </div>
            </div>
            <form className={s.profile_input}>
                <Input
                    label={'Nickname'}
                    value={newName}
                    onChangeText={setNewName}
                />
                <Input
                    className={s.editableSpan}
                    label={'email'}
                    value={userEmail}
                />
            </form>
            <div className={s.buttons_container}>
                <Button className={s.button_cancel} onClick={cancelChangeName} >Cancel</Button>
                <Button className={s.button_save} onClick={changeName}>Save</Button>
            </div>
        </div>
    )
}
