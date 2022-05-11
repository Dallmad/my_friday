import React, {useState} from 'react';
import s from "./Paginator.module.css";

type PaginatorTypeProps = {
        totalCount: number
        pageSize: number
        currentPage: number
        onPageChanged: (numberPage: number) => void
}

export const Paginator: React.FC<PaginatorTypeProps> = ({totalCount, pageSize, currentPage, onPageChanged}) => {

    let portionSize = 5

    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber-1)*portionSize+1
    let rightPortionNumber = portionNumber*portionSize


    return (
        <div>
            {portionNumber>1 &&
                <button onClick={() => { setPortionNumber(portionNumber-1)}}>LEFT</button>}
            {pages
                .filter(p => p >= leftPortionNumber && p<=rightPortionNumber)
                .map((p, i) => {
                    return (
                        <span key={i} onClick={() => {
                            onPageChanged(p);
                        }} className={currentPage === p ? s.selectedPage : ''}>{p} </span> //className={this.props.currentPage === p && s.selectedPage}
                    )
                })}
            {portionCount>portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber+1)}}>RIGHT</button>}
        </div>
    )
}

