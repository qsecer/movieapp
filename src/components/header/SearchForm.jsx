import './searchForm.css';
import { useEffect, useRef } from "react";

function  Input ({ inputValue, setInputValue, myKey, setFilms}) {
    const debounce = (fn, debounceTime) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, debounceTime);
        };
    };

    const debouncedSearchFilm = useRef(
        debounce(async (query) => {
            try {
                const resultOfSearch = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${myKey}&query=${query}`);
                if (!resultOfSearch.ok) {
                    console.error('что-то не так с поиском...');
                    return;
                }
                const res = await resultOfSearch.json();
                const films = res.results.map(film => ({
                    title: film.title,
                    image: film.poster_path,
                    date: film.release_date,
                    overview: film.overview,
                    raiting: film.vote_average,
                    id: film.id,
                    key: film.id
                }));
                setFilms(films);
            } catch (error) {
                console.error(error);
            } finally {
                console.log('Поиск завершён');
            }
        }, 1000)
    );

    useEffect(( )=> {
        if (inputValue.trim()){
            debouncedSearchFilm.current(inputValue);
        }
    }, [inputValue])

    return (
        <input
            onChange={(event)=>{setInputValue(event.target.value)}}
        />
    )

}
export default Input;
