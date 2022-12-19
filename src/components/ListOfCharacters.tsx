import { FC, PropsWithChildren } from "react";
import { Character } from "../types/character";
import CharacterItem from "./CharacterItem";
import style from './ListOfCharacters.module.css';

interface IListOfCharactersProps {
    characters: Character[];
    currentPage: number;
}

type ListOfCharactersProps = IListOfCharactersProps & PropsWithChildren;

const ListOfCharacters: FC<ListOfCharactersProps> = (props) => {

    const charactersList = props.characters.map((character, index) => {
        return (
            <CharacterItem key={index+props.currentPage} character={character} />
        )
    });

    if (charactersList.length === 0) {
        return (<div className={style.ListOfCharacters}>
            <h4>Not found characters!</h4>
        </div>);
    }

    return (
        <div className={style.ListOfCharacters}>
            {charactersList}
        </div>
    )
}

export default ListOfCharacters;