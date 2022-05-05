import React from "react";
import Button from "../Button/Button";
import {logout} from "../../state/auth-reducer";
import {useTypedDispatch} from "../../state/store";

export const Logout = () => {

    const dispatch = useTypedDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Button onClick={logoutHandler}>
            Logout
        </Button>
    )
}