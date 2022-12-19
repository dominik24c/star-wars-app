import { FC, PropsWithChildren } from "react";
import { Movie } from "../types/movie";
import style from "./MovieItem.module.css";

type MovieItemProps = Movie & PropsWithChildren;

const MovieItem: FC<MovieItemProps> = (props) => {
    const openingCrawl = props.openingCrawl.slice(0, 130).trim() + "...";
    return (
        <div className={style.MovieItem}>
            <h3 className={style.MovieItem_Title}>{props.title}</h3>
            <div className={style.MovieItem_Date}>
                <p>{props.releaseDate}</p>
            </div>
            <p className={style.MovieItem_Text}>{openingCrawl}</p>
        </div>
    );
}

export default MovieItem;