import {NavLink} from "react-router-dom";
import {PATH} from '../Routes/Routes';
import s from './Header.module.css'
import {ErrorSnackbar} from '../../components/ErrorSnackbar/ErrorSnackbar';


export const Header = () => {
    return (
        <div className={s.div}>
            <ErrorSnackbar/>
            <NavLink to={PATH.PROFILE} className={`${s.link} ${s.button}`}>Profile</NavLink>
            <NavLink to={PATH.TEST_PAGE} className={`${s.link} ${s.button}`}>Test page</NavLink>
            <NavLink to={PATH.REGISTRATION} className={`${s.link} ${s.button}`}>Registration</NavLink>
            <NavLink to={PATH.LOGIN} className={`${s.link} ${s.button}`}>Login</NavLink>
        </div>
    )
}