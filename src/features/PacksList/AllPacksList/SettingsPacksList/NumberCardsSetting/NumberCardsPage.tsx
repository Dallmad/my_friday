import s from '../../AllPacksList.module.css';
import Button from '../../../../../components/Button/Button';
import Input from '../../../../../components/Input/Input';
import React, {useState} from 'react';
import {fetchPacksTC, setNumbersPacksAC} from '../../../../../state/packs-reducer';
import {AppRootStateType, useTypedDispatch} from '../../../../../state/store';
import {useSelector} from 'react-redux';

export const NumberCardsPage = () => {

    const dispatch = useTypedDispatch()
    const lastMinCardsValue = useSelector<AppRootStateType, number>(state => state.packs.minCardsCount)
    const lastMaxCardsValue = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount)

    const [minCardsCount,setMinCardsCount] = useState<number | string>(lastMinCardsValue ? lastMinCardsValue : 0)
    const [maxNumberCards,setMaxNumberCards] = useState<number | string>(lastMaxCardsValue ? lastMaxCardsValue : 5)

    const applySettings = () => {
        dispatch(setNumbersPacksAC(+minCardsCount,+maxNumberCards))
        dispatch(fetchPacksTC())
    }

    return (
        <>
            <h4 className={s.secondH4}>
                Number of cards
                <Button onClick={applySettings}>Apply</Button>
                <div>
                    <Input value={minCardsCount} onChange={(e)=>setMinCardsCount(e.currentTarget.value)}/>
                </div>
                <div>
                    <Input value={maxNumberCards} onChange={(e)=>setMaxNumberCards(e.currentTarget.value)}/>
                </div>
            </h4>
        </>
    )
}
