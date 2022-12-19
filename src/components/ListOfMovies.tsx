import { FC, PropsWithChildren } from "react";
import { Movie } from "../types/movie";
import MovieItem from "./MovieItem";

interface IListOfMoviesProps {
    movies: Movie[];
}

type ListOfMoviesProps = IListOfMoviesProps & PropsWithChildren;

const ListOfMovies: FC<ListOfMoviesProps> = (props) => {
    const movies = props.movies.map((m, index) => {
        return <MovieItem key={index} title={m.title} releaseDate={m.releaseDate} openingCrawl={m.openingCrawl} />
    });

    return (
        <div>
            {movies}
        </div>
    );
}

export default ListOfMovies;