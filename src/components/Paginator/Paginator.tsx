import React from 'react';
import s from "./Paginator.module.css";

type PaginatorTypeProps = {
        totalCount: number
        pageSize: number
        currentPage: number
        onPageChanged: (numberPage: number) => void
}

export const Paginator: React.FC<PaginatorTypeProps> = ({totalCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map((p, i) => {
                return (
                    <span key={i} onClick={() => {
                        onPageChanged(p);
                    }} className={currentPage === p ? s.selectedPage : ''}>{p} </span> //className={this.props.currentPage === p && s.selectedPage}
                )
            })}
        </div>
    )
}

