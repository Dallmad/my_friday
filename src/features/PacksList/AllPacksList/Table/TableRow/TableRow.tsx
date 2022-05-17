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
import React, {useState} from 'react';
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
    const [value, onChangeOption] = useState((grades[0]))

    const [card, setCard] = useState<CardType>(cards[0])

    const myUserId = useSelector<AppRootStateType, string>(state => state.profile._id)

    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const editPackHandler = (cardPacks: ResponsePackType) => {
        dispatch(updatedPackTC(cardPacks))
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
        dispatch(setPackAC(cardPacks._id))
        dispatch(setCardsTC())
        setShowModalLearn(value)
        setCard(getCard(cards))
    }

    const editShowModalLearn2 = (value: boolean) => {
        setShowModalLearn2(value)
    }
    const indexCard = (grades.indexOf(value)+1)

    const editShowModalLearnNext = () => {
        dispatch(setPackAC(cardPacks._id))
        //dispatch(setCardsTC())
        //setCard(getCard(cards))


        //dispatch(editGradeCardAC(4,card._id))
        //dispatch(editGradeCardTC(indexCard, card._id))
        setShowModalLearn2(false)

    }

    const allShowModalLearn = (value: boolean) => {
        setShowModalLearn(value)
        setShowModalLearn2(value)
    }
    /*console.log('grade:'+(grades.indexOf(value)+1),'id:'+card._id,'currGrade:'+card.grade)*/
    //console.log('id:'+_id,'id2222:'+card._id,'quest:'+card.question)
    //let {question,answer} = card



    return (
        <tr>
            <td onClick={setChangePageToCard}>
                {name}
            </td>
            <TableCell packValue={cardsCount}/>
            <TableCell packValue={updated}/>
            <TableCell packValue={user_name}/>
            <td className="button">
                {myUserId === user_id && <Button onClick={() => deletePackHandler(_id)}>Delete</Button>}
                {/*<Modal editShowModal={editShowModal} showModal={showModal}>*/}
                {/*    <div className={s.modal}>*/}
                {/*        <div className={s.titleModal}>*/}
                {/*            Add new pack*/}
                {/*        </div>*/}
                {/*        <Input value={newPack} onChange={(e) => setNewPack(e.currentTarget.value)}/>*/}
                {/*        <div className={s.containerBtn}>*/}
                {/*            <Button onClick={() => editShowModal(false)}>cancel</Button>*/}
                {/*            <Button onClick={() => addNewPackHandler(newPack)}>save</Button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Modal>*/}

                {myUserId === user_id && <Button onClick={() => editPackHandler(cardPacks)}>Edit</Button>}
                {/*<Modal editShowModal={editShowModal} showModal={showModal}>*/}
                {/*    <div className={s.modal}>*/}
                {/*        <div className={s.titleModal}>*/}
                {/*            Add new pack*/}
                {/*        </div>*/}
                {/*        <Input value={newPack} onChange={(e) => setNewPack(e.currentTarget.value)}/>*/}
                {/*        <div className={s.containerBtn}>*/}
                {/*            <Button onClick={() => editShowModal(false)}>cancel</Button>*/}
                {/*            <Button onClick={() => addNewPackHandler(newPack)}>save</Button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Modal>*/}

                <Button onClick={() => editShowModalLearn(true)}>Learn</Button>


                <Modal editShowModal={editShowModalLearn} showModal={showModalLearn}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Learn Pack Name
                        </div>
                        <div className={s.titleModal}>
                            {/*{card.question}*/}
                        </div>
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
                        <div className={s.titleModal}>
                           {/* {card.question}*/}
                        </div>
                        <div className={s.titleModal}>
                           {/* {card.answer}*/}
                        </div>
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

