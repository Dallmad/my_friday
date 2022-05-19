import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Cards.module.css'
import Button from "../../components/Button/Button";
import {AppRootStateType, useTypedDispatch} from "../../state/store";
import {useSelector} from "react-redux";
import {
    addCardTC,
    CardType,
    setCardsTC,
    setPageCardsAC, setSearchCardsAnswerAC, setSearchCardsQuestionAC,
    setSortCardsAC, setPackAC
} from '../../state/cadrs-reducer';
import {Card} from './Card/Card';
import Input from "../../components/Input/Input";
import {Paginator} from "../../components/Paginator/Paginator";
import {Navigate, useParams} from "react-router-dom";
import {Modal} from "../../components/Modal/Modal";


export const Cards = () => {

    const dispatch = useTypedDispatch()

    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const cardsPack_id = useSelector<AppRootStateType, string>(state => state.cards.cardsPack_id)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const page = useSelector<AppRootStateType, number>(state => state.cards.page)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const sortCardsInit = useSelector<AppRootStateType, string>(state => state.cards.sortCards)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    let {pack_id} = useParams()

    const [currentPage, setCurrentPage] = useState(page)
    const [sortCards, setSortCards] = useState(sortCardsInit)
    const [titleAnswer, setTitleAnswer] = useState('')
    const [titleQuestion, setTitleQuestion] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [newTitleQuestion, setNewTitleQuestion] = useState('')
    const [newTitleAnswer, setNewTitleAnswer] = useState('')

    useEffect(() => {
        if(pack_id){
            dispatch(setPackAC(pack_id))
        }
        dispatch(setCardsTC())
    }, [currentPage, sortCards, pack_id])

    const addCard = (newTitleQuestion: string, newTitleAnswer: string) => {
        dispatch(addCardTC(newTitleQuestion, newTitleAnswer))
        setNewTitleQuestion('')
        setNewTitleAnswer('')
    }

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(setPageCardsAC(pageNumber))
    }

    const onSortCards = (value: string) => {
        let direction = sortCards.slice(0, 1)
        let sort = +!+direction.slice(0, 1)+value
        setSortCards(sort)
        dispatch(setSortCardsAC(sort))
    }

    const onChangeTitleAnswer = (e: ChangeEvent<HTMLInputElement>, ) => {
        setTitleAnswer(e.currentTarget.value)
    }

    const onClickTitleAnswer = () => {
        dispatch(setSearchCardsAnswerAC(titleAnswer))
    }

    const onChangeTitleQuestion = (e: ChangeEvent<HTMLInputElement>, ) => {
        setTitleQuestion(e.currentTarget.value)
    }

    const onClickTitleQuestion = () => {
        dispatch(setSearchCardsQuestionAC(titleQuestion))
    }

    const onClickCancelSearch = () => {
        setTitleAnswer('')
        setTitleQuestion('')
        dispatch(setCardsTC())
    }

    const editShowModal = (value: boolean) => {
        setShowModal(value)
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={s.container}>
            <Input type="text" value={titleAnswer} onChange={(e) => onChangeTitleAnswer(e)}/>
            <Button onClick={onClickTitleAnswer}>Search answer</Button>
            <Input type="text" value={titleQuestion} onChange={(e) => onChangeTitleQuestion(e)}/>
            <Button onClick={onClickTitleQuestion}>Search question</Button>
            <Button onClick={onClickCancelSearch}>Search cancel</Button>
            <table className="table">
                <thead>
                <tr>
                    <th onClick={() => onSortCards('question')}>question</th>
                    <th onClick={() => onSortCards('answer')}>answer</th>
                    <th onClick={() => onSortCards('grade')}>grade</th>
                    <th onClick={() => onSortCards('updated')}>updated</th>
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
                    />)}
                </tbody>
            </table>
            <Button onClick={() => editShowModal(true)}>Add new card</Button>
            <Modal editShowModal={editShowModal} showModal={showModal}>
                <div className={s.bigModal}>
                    <div className={s.titleModal}>
                        Add new card
                    </div>
                    Question
                    <Input value={newTitleQuestion} onChange={(e) => setNewTitleQuestion(e.currentTarget.value)}/>
                    Answer
                    <Input value={newTitleAnswer} onChange={(e) => setNewTitleAnswer(e.currentTarget.value)}/>
                    <div className={s.containerBtn}>
                        <Button onClick={() => editShowModal(false)}>cancel</Button>
                        <Button onClick={() => addCard(newTitleQuestion, newTitleAnswer)}>save</Button>
                    </div>
                </div>
            </Modal>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalCount={cardsTotalCount} pageSize={pageCount}/>
        </div>
    );
};

