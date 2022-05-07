import {useState} from 'react';
import {Navigate} from 'react-router-dom';

export const MyPacksList = () => {

    const [changePage, setChangePage] = useState(false)

    const changeOnMyPacksList = () => {
        setChangePage(true)
    }





    if (changePage) return <Navigate to="/all-packs-list"/>

    return (
        <>

        </>
    )
}