import {NavLink} from "react-router-dom";
import {PATH} from '../Routes/Routes';
import s from './Header.module.css'
import {Preloader} from '../../components/Preloader/Preloader';
import {Logout} from '../../components/Logout/Logout';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";


export const Header = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistration)


    return (
        <div>
            <div className={s.preloader}>
                <Preloader/>
            </div>
            <div className={s.navLink}>
                <NavLink to={PATH.PROFILE} className={s.link}>Profile</NavLink>
                <NavLink to={PATH.ALL_PACKS_LIST} className={s.link}>Packs List</NavLink>
                <NavLink to={PATH.TEST_PAGE} className={s.link}>Test page</NavLink>
                {!isLoggedIn&&!isRegistration&&<NavLink to={PATH.REGISTRATION} className={s.link}>Registration</NavLink>}
                <Logout/>
            </div>
        </div>
    )
}
