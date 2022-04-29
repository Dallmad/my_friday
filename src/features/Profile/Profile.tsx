import {Navigate} from 'react-router-dom';
import s from './Profile.module.css'

export const Profile = () => {

    /*if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }*/

    return (
        <div className={s.div}>
            Profile
        </div>
    )
}
