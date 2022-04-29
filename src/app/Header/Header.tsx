
import {NavLink} from "react-router-dom";
import {PATH} from '../Routes/Routes';
import s from './Header.module.css'


export const Header = () => {
    return (
        <div className={s.div}>
            <NavLink to={PATH.PROFILE} className={`${s.link} ${s.button}`}>Profile</NavLink>
            <NavLink to={PATH.TEST_PAGE} className={`${s.link} ${s.button}`}>Test page</NavLink>
        </div>
    )
}