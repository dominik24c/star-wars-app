import { FC, PropsWithChildren, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Character } from "../types/character";
import ListOfCharacters from "./ListOfCharacters";
import { fetchCharactersByHomeworldName, fetchCharactersByHomeworldPopulation, fetchCharactersByfullName } from "../api/characters";
import Pagination from "./Pagination";
import style from "./SearchBar.module.css";
import Spinner from "../layout/Spinner";

interface ISearchInput {
    searchPhrase: string;
    searchBy: string;
};

const OPT_FULLNAME = 'fullName';
const OPT_HOMEWORLD_NAME = 'homeworldName';
const OPT_HOMEWORLD_POPULATION = 'homeworldPopulation';

const SearchBar: FC<PropsWithChildren> = (props) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFailed, setIsFailed] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<ISearchInput>();

    const submitHandler: SubmitHandler<ISearchInput> = async (formData) => {
        const searchPhrase = formData.searchPhrase;
        setCharacters([]);
        setIsLoading(true);
        setIsFailed(false);

        try {
            if (formData.searchBy === OPT_HOMEWORLD_NAME) {
                const heroes = await fetchCharactersByHomeworldName(searchPhrase);
                setCharacters([...heroes]);

            } else if (formData.searchBy === OPT_HOMEWORLD_POPULATION) {
                const heroes = await fetchCharactersByHomeworldPopulation(searchPhrase);
                setCharacters([...heroes]);
            } else {
                const heroes = await fetchCharactersByfullName(searchPhrase);
                setCharacters([...heroes]);
            }
        }
        catch (error) {
            // console.log(error);
            setIsFailed(true);
        }

        setIsLoading(false);
        setCurrentPage(0);
    }
    const pageSize = 10;
    const goToNextPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const page = currentPage * pageSize;
    const charactersToRender = characters.slice(page, page + pageSize);

    return (
        <div className={style.SearchBar}>
            <div className={style.SearchInput}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <select {...register("searchBy")}>
                        <option value={OPT_FULLNAME}>character full name</option>
                        <option value={OPT_HOMEWORLD_NAME}>homeworld name</option>
                        <option value={OPT_HOMEWORLD_POPULATION}>homeworld population</option>
                    </select>
                    <input
                        type="text"
                        {...register("searchPhrase", { required: "Required", })}
                        placeholder="Search"
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            {isFailed ? <p>Something went wrong!</p> : isLoading ? <Spinner /> : <>
                <ListOfCharacters characters={charactersToRender} currentPage={currentPage*pageSize}/>
                <Pagination currentPage={currentPage} countPage={Math.ceil(characters.length / pageSize)} goToNextPage={goToNextPage} />
            </>}
        </div>
    )
}

export default SearchBar;