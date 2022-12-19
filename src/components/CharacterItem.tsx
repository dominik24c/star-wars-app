import { PropsWithChildren, useState } from "react";
import { Character } from "../types/character";
import { Movie } from "../types/movie";
import style from './CharacterItem.module.css';
import ListOfMovies from "./ListOfMovies";

interface ICharacterItemProps {
    character: Character;
}

interface IFetchedMovie {
    title: string;
    release_date: string;
    opening_crawl: string;
}

type CharacterItemProps = ICharacterItemProps & PropsWithChildren;

const CharacterItem: React.FC<CharacterItemProps> = (props) => {
    const character = props.character;

    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchFilmsHandler = async () => {
        if (isHidden) {
            // console.log(character.moviesUrl)
            const responses = await Promise.all(character.moviesUrl.map(url => fetch(url)))
            const responsesJson = await Promise.all(responses.map(r => r.json()))
            setMovies(responsesJson.map((m: IFetchedMovie) => {
                return {
                    title: m.title,
                    releaseDate: m.release_date,
                    openingCrawl: m.opening_crawl
                }
            }));
            setIsHidden(false);
        } else {
            setIsHidden(true);
        }

    }

    return (
        <div className={style.characterItem}>
            <div className={style.characterName} onClick={fetchFilmsHandler}>
                <p>{character.name}</p>
            </div>
            <div>
                {!isHidden && <ListOfMovies movies={movies}/>}
            </div>
        </div>
    );
}

export default CharacterItem;