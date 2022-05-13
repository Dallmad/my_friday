import React, {useState} from 'react'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import s from '../../components/Button/Button.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../app/Routes/Routes";


export const ForgotPassword = () => {

    const [email, setEmail] = useState('')

        return (
            <div className={s.div}>
                <Input value={email}/>
                <Button/>
                <div className={s.link}>
                    <NavLink to={PATH.LOGIN} className={s.link}>Cancel</NavLink>
                </div>
            </div>
        )
    }

