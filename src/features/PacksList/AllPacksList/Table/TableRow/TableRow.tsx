import {TableCell} from './TableCell/TableCell';
import {deletePackTC, ResponsePackType, updatedPackTC} from '../../../../../state/packs-reducer';
import '../../AllPacksList.module.css'
import Button from '../../../../../components/Button/Button';
import {AppRootStateType, useTypedDispatch} from '../../../../../state/store';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../../app/Routes/Routes';
import {useSelector} from "react-redux";
import s from "../../AllPacksList.module.css";
import Input from "../../../../../components/Input/Input";
import {Modal} from "../../../../../components/Modal/Modal";
import React, {useEffect, useState} from 'react';
import Radio from "../../../../../components/Radio/Radio";
import {CardType, editGradeCardTC, setCardsTC, setPackAC} from '../../../../../state/cadrs-reducer';

const grades: string[] = [`Don't know`, 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    //console.log('test: ', sum, rand, res)
    return cards[res.id + 1];
}

export const TableRow = ({cardPacks}: ResponseCardPackType) => {

    const {name, cardsCount, updated, user_name, _id, user_id} = cardPacks
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalLearn, setShowModalLearn] = useState(false);
    const [showModalLearn2, setShowModalLearn2] = useState(false);
    const [packTitle, setTackTitle] = useState<string>(name)
    const [value, onChangeOption] = useState((grades[0]))

    const [card, setCard] = useState<CardType>(cards[0])

    const myUserId = useSelector<AppRootStateType, string>(state => state.profile._id)

    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const editPackHandler = (packTitle: string) => {
        dispatch(updatedPackTC(_id, packTitle))
    }

    const setChangePageToCard = () => {
        navigate(`${PATH.ALL_PACKS_LIST}/${_id}`)
    }

    const editShowModalDelete = (value: boolean) => {
        setShowModalDelete(value)
    }

    const editShowModalEdit = (value: boolean) => {
        setShowModalEdit(value)
    }

    const editShowModalLearn = (value: boolean) => {
            //setCard(getCard(cards))
            dispatch(setPackAC(cardPacks._id))
            dispatch(setCardsTC())
            setShowModalLearn(value)
    }

    const editShowModalLearn2 = (value: boolean) => {
        setShowModalLearn2(value)
    }
    const indexCard = (grades.indexOf(value)+1)

    const editShowModalLearnNext = () => {
        if (card) {
            dispatch(setPackAC(cardPacks._id))
            setCard(getCard(cards))
            dispatch(editGradeCardTC(indexCard, card._id))
            setShowModalLearn2(false)
        }
    }

    const allShowModalLearn = (value: boolean) => {
        setShowModalLearn(value)
        setShowModalLearn2(value)
    }
    const dateUpdate = updated.slice(8,10)+updated.slice(4,8)+updated.slice(0,4)

    useEffect(()=>{
        setCard(getCard(cards))
    },[cards])

    return (
        <tr>
            <td onClick={setChangePageToCard}>
                {name}
            </td>
            <TableCell packValue={cardsCount}/>
            <TableCell packValue={dateUpdate}/>
            <TableCell packValue={user_name}/>
            <td className="button">
                {myUserId === user_id && <Button onClick={() => editShowModalDelete(true)}>Delete</Button>}
                <Modal editShowModal={editShowModalDelete} showModal={showModalDelete}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Delete pack
                        </div>
                        <div className={s.containerBtn}>
                            <Button onClick={() => setShowModalDelete(false)}>cancel</Button>
                            <Button onClick={() => deletePackHandler(_id)}>delete</Button>
                        </div>
                    </div>
                </Modal>

                {myUserId === user_id && <Button onClick={() => editShowModalEdit(true)}>Edit</Button>}
                <Modal editShowModal={editShowModalEdit} showModal={showModalEdit}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Edit pack
                        </div>
                        <Input value={packTitle} onChange={(e) => setTackTitle(e.currentTarget.value)}/>
                        <div className={s.containerBtn}>
                            <Button onClick={() => editShowModalEdit(false)}>cancel</Button>
                            <Button onClick={() => editPackHandler(packTitle)}>save</Button>
                        </div>
                    </div>
                </Modal>

                <Button onClick={() => editShowModalLearn(true)}>Learn</Button>

                <Modal editShowModal={editShowModalLearn} showModal={showModalLearn}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Learn Pack Name
                        </div>
                        {card && <div className={s.titleModal}>
                            {card.question}
                        </div>}
                        <div className={s.containerBtn}>
                            <Button onClick={() => setShowModalLearn(false)}>cancel</Button>
                            <Button onClick={() => editShowModalLearn2(true)}>show answer</Button>
                        </div>
                    </div>
                </Modal>

                <Modal editShowModal={allShowModalLearn} showModal={showModalLearn2}>
                    <div className={s.bigModal}>
                        <div className={s.titleModal}>
                            Learn Pack Name
                        </div>
                        {card && <div className={s.titleModal}>
                            {card.question}
                        </div>}

                        {card && <div className={s.titleModal}>
                            {card.answer}
                        </div>}
                        <div>
                            <Radio options={grades}
                                   value={value}
                                   onChangeOption={onChangeOption}
                            />
                        </div>
                        <div className={s.containerBtn}>
                            <Button onClick={() => allShowModalLearn(false)}>cancel</Button>
                            <Button onClick={editShowModalLearnNext}>next</Button>
                        </div>
                    </div>
                </Modal>

            </td>
        </tr>
    )
}

//types
type ResponseCardPackType = {
    cardPacks: ResponsePackType
}
