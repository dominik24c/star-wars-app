import { FC, PropsWithChildren } from "react";
import style from './Pagination.module.css';

interface IPaginationProps {
    countPage: number;
    currentPage: number;
    goToNextPage(n: number): void;
}

type PaginationProps = IPaginationProps & PropsWithChildren;

const Pagination: FC<PaginationProps> = (props) => {
    const pages: number[] = []
    for (let i = 1; i <= props.countPage; i++) {
        pages.push(i);
    }
    if (pages.length === 0) {
        return null;
    }

    return (
        <div className={style.pagination}>
            <ul>
                {pages.map(p => <li className={props.currentPage + 1 === p ? style.active : style.link} key={p} onClick={(e) => props.goToNextPage(p - 1)}>{p}</li>)}
            </ul>
        </div>
    )

}

export default Pagination;