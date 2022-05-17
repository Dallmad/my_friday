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
import React, {useState} from "react";
import Radio from "../../../../../components/Radio/Radio";


export const TableRow = ({cardPacks}: ResponseCardPackType) => {

    const arr = ['1', '2', '3', '4', '5']

    const {name, cardsCount, updated, user_name, _id, user_id} = cardPacks

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalLearn, setShowModalLearn] = useState(false);
    const [showModalLearn2, setShowModalLearn2] = useState(false);
    const [value, onChangeOption] = useState(arr[0])


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
        setShowModalLearn(value)
    }

    const editShowModalLearn2 = (value: boolean) => {
        setShowModalLearn2(value)
    }

    const editShowModalLearnNext = () => {
        setShowModalLearn2(false)
    }

    const allShowModalLearn = (value: boolean) => {
        setShowModalLearn(value)
        setShowModalLearn2(value)
    }

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
                            Question:
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
                            Question:
                        </div>
                        <div className={s.titleModal}>
                            Answer:
                        </div>
                        <div>
                            <Radio options={arr}
                                   value={value}
                                   onChangeOption={onChangeOption}/>
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
