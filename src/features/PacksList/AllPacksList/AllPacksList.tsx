import {Navigate} from 'react-router-dom';
import Button from '../../../components/Button/Button';
import {useState} from 'react';
import Input from '../../../components/Input/Input';
import {Table} from './Table/Table';

export const AllPacksList = () => {

    const [changePage, setChangePage] = useState(false)

    const changeOnMyPacksList = () => {
        setChangePage(true)
    }
    if (changePage) return <Navigate to="/my-packs-list"/>

    return (
        <>
            <div>
                <h4>Show packs cards</h4>
                <Button onClick={changeOnMyPacksList}>
                    My
                </Button>
                <Button>
                    All
                </Button>
                <p>
                    Number of cards
                </p>
                <h2>Packs list</h2>
                <Input/>
                <Button>Search</Button>
                <Button>Add new pack</Button>
            </div>
            <Table/>
        </>
    )
}