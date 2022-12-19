import { API_URL } from "../constants";
import { Character } from "../types/character"

interface Hero {
    name: string;
    films: string[];
}

interface Planet {
    population: string;
    residents?: string[];
}

const getUniqueResidents = (planets: Planet[]): string[] => {
    const residentsUrl = new Set();
    planets.forEach((planet: { residents?: string[] }) => {
        planet?.residents?.forEach((url: string) => {
            residentsUrl.add(url);
        })
    })

    const arrayOfResidentsUrl = Array.from(residentsUrl) as string[];
    return arrayOfResidentsUrl;
}

const fetchManyHeroes = async (urls: string[]): Promise<Character[]> => {
    const responses = await Promise.all(urls.map((url: string) => fetch(url)));
    const heroes = await Promise.all(responses.map(r => r.json()));
    return heroes.map((hero: Hero) => {
        return { name: hero.name, moviesUrl: hero.films }
    });
}

const fetchAllPlanetsOrHeroes = async (url: string): Promise<Planet[] | Hero[]> => {
    let nextUrl = url
    let items: Planet[] | Hero[] = [];
    do {
        const response = await fetch(nextUrl);
        const data = await response.json();
        nextUrl = data?.next;
        // console.log(data);
        items = [...items, ...data?.results];
    } while (nextUrl)

    return items;
}


export const fetchCharactersByfullName = async (searchPhrase: string): Promise<Character[]> => {
    const heroes = await fetchAllPlanetsOrHeroes(`${API_URL}/people?search=${searchPhrase}`) as Hero[];
    return heroes.map(hero => {
        return { name: hero.name, moviesUrl: hero.films }
    })
}

export const fetchCharactersByHomeworldName = async (searchPhrase: string): Promise<Character[]> => {
    const planets = await fetchAllPlanetsOrHeroes(`${API_URL}/planets?search=${searchPhrase}`) as Planet[];
    const arrayOfResidentsUrl = getUniqueResidents(planets);
    return fetchManyHeroes(arrayOfResidentsUrl);
}

export const fetchCharactersByHomeworldPopulation = async (searchPhrase: string): Promise<Character[]> => {
    const planets = await fetchAllPlanetsOrHeroes(`${API_URL}/planets/`) as Planet[];
    const filteredPlanets = planets.filter(planet => planet.population === searchPhrase);
    const arrayOfResidentsUrl = getUniqueResidents(filteredPlanets)
    return fetchManyHeroes(arrayOfResidentsUrl);
}