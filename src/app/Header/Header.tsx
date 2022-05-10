import {NavLink} from "react-router-dom";
import {PATH} from '../Routes/Routes';
import s from './Header.module.css'
import {Preloader} from '../../components/Preloader/Preloader';
import {Logout} from '../../components/Logout/Logout';


export const Header = () => {
    return (
        <div>
            <div className={s.preloader}>
                <Preloader/>
            </div>
            <div className={s.navLink}>
                <NavLink to={PATH.PROFILE} className={s.link}>Profile</NavLink>
                <NavLink to={PATH.ALL_PACKS_LIST} className={s.link}>Packs List</NavLink>
                <NavLink to={PATH.TEST_PAGE} className={s.link}>Test page</NavLink>
                <NavLink to={PATH.REGISTRATION} className={s.link}>Registration</NavLink>
                <NavLink to={PATH.CARDS} className={s.link}>MyCards</NavLink>
                <Logout/>
            </div>
        </div>
    )
}
