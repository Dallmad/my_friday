import {TableRow} from './TableRow/TableRow';
import {useTypedDispatch} from '../../../../state/store';
import {useEffect} from 'react';

export const Table = () => {

    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch()
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