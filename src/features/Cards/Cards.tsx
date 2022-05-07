import React, {useEffect} from 'react';
import s from './Cards.module.css'
import Button from "../../components/Button/Button";
import {AppRootStateType, useTypedDispatch} from "../../state/store";
import {useSelector} from "react-redux";
import {addCardTC, CardType, deleteCardTC, editCardTC, setCardsTC} from "../../state/cadrs-reducer";
import {Card} from './Card/Card';

export const Cards = () => {

    const dispatch = useTypedDispatch()

    const cards = useSelector<AppRootStateType, any[]>(state => state.cards.cards)
    const cardsPack_id = useSelector<AppRootStateType, string>(state => state.cards.cardsPack_id)

    useEffect(() => {
        dispatch(setCardsTC())
    }, [cardsPack_id, cards.length])

    const addCard = () => {
        dispatch(addCardTC())
    }

    const deleteCard = (id: string) => {
        dispatch(deleteCardTC(id))
    }

    const editCard = (id: string) => {
        dispatch(editCardTC(id))
    }

    return (
        <div className={s.container}>
            <input type="text"/>
            <Button>Search</Button>
            <input type="text"/>
            <Button>Search</Button>
            <table className="table">
                <thead>
                <tr>
                    <th>answer</th>
                    <th>question</th>
                    <th>grade</th>
                    <th>updated</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {cards.map(({_id, answer, question, grade, updated}: CardType) =>
                    <Card key={_id}
                          _id={_id}
                          answer={answer}
                          question={question}
                          grade={grade}
                          updated={updated}
                          deleteCard={deleteCard}
                          editCard={editCard}
                    />)}
                </tbody>
            </table>
            <Button onClick={addCard}>Add</Button>
        </div>
    );
};

