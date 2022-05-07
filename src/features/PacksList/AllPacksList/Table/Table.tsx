import {TableRow} from './TableRow/TableRow';
import {useTypedDispatch} from '../../../../state/store';
import {useEffect} from 'react';
import {setPacksThunk} from '../../../../state/packs-reducer';

export const Table = () => {

    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch(setPacksThunk())
    }, [])

    return (
        <div>
            <div>
                <div>
                    Name Cell
                </div>
            </div>
            <TableRow/>
        </div>
    )
}