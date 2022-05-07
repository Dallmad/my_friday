import {TableRow} from './TableRow/TableRow';
import {AppRootStateType, useTypedDispatch} from '../../../../state/store';
import {useEffect} from 'react';
import {ResponsePackType, setPacksThunk} from '../../../../state/packs-reducer';
import {useSelector} from 'react-redux';
import {TableHeader} from './TableHeader/TableHeader';

export const Table = () => {

    const dispatch = useTypedDispatch()
    const packs = useSelector<AppRootStateType, ResponsePackType[]>(state => state.packs.cardPacks)

    useEffect(() => {
        dispatch(setPacksThunk())
    }, [])

    return (
        <div>
            <TableHeader/>
            {packs.map((cardPacks) => <TableRow
                        key={cardPacks._id + cardPacks.user_id}
                        cardPacks={cardPacks}
                    />
            )}
        </div>
    )
}