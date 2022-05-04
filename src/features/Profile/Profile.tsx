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
import {TextField} from "@mui/material";

export const Profile = () => {

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

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={s.div}>
            <div className={s.profile_name}>
                Personal Information
            </div>
            <div className={s.profile_img}>
                <img src={ava} alt="Avatar"/>
                <div className={s.img__icon}>
                    <img src={icon} alt="Img-Icon"/>
                </div>
            </div>
            <div className={s.profile_input}>
                <TextField id="standard-basic"
                           label="Nickname"
                           variant="standard"
                           className={s.profile_textfield}/>
                <TextField id="standard-basic"
                           label="Email"
                           variant="standard"
                           className={s.profile_textfield}/>
            </div>

            {/*для чего editable span?*/}
            {/*<EditableSpan value={newName}*/}
            {/*              onChangeText={setNewName}*/}
            {/*              onBlur={changeName}*/}
            {/*              onEnter={changeName}*/}
            {/*/>*/}

            {/*x3*/}

            <div className={s.buttons_container}>
                <button className={s.button_cancel}>Cancel</button>
                <button className={s.button_save}>Save</button>
            </div>
        </div>
    )
}
