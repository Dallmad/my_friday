import {Navigate} from 'react-router-dom';
import s from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {ProfileStateType, setProfileStateThunk} from "../../state/profile-reducer";
import {ChangeEvent, useState} from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const profileData = useSelector<AppRootStateType, ProfileStateType>((state) => state.profile)
    const dispatch = useDispatch()
    const [nameSwitch, changeSwitch] = useState(false)
    const [newName, setNewName] = useState('')


    //if (!isLoggedIn) {
    //    return <Navigate to='/login'/>
    // }


    let picture = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'

    const changeSwitchHandler = () => {
        changeSwitch(true)
    }

    const newNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const changeName = () => {
        //@ts-ignore
        dispatch(setProfileStateThunk(newName, picture))
        changeSwitch(false)
    }


    return (
        <div className={s.div}>
            <div>
                Profile
                <div>
                    <img src={picture} alt="Avatar"/>
                </div>
                    {nameSwitch
                        ? (
                        <div >
                               <Input value={newName} type="text" onChange={newNameHandler} />
                               <Button onClick={changeName}>Change</Button>
                        </div>
                        )
                        : (
                            <div>
                                <span onDoubleClick={changeSwitchHandler}>name</span>
                            </div>
                        )}
            </div>
        </div>
    )
}
