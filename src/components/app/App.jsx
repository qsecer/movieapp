import { useState, useEffect } from 'react';
import FilmList from "../body/filmList/FilmList.jsx";
import SearchForm from "../header/SearchForm.jsx";
import Pag from "../footer/Pagination.jsx";
import './app.css'
import Spinner from "../spin/Spin.jsx";
import NoConnetion from "../Alert/Alert.jsx";
import MyTabs from "../tabs/Tabs.jsx";
import NotFound from "../notFound/NotFound.jsx";

function App() {

  const myKey = '7812d20e5e0384301cc6da5809c89aa2';
  const urlForGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${myKey}&language=en-US`;
  const urlForSession = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${myKey}`;

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numberOfPage, setNumberOfPage] = useState(1);
  const [value, setValue] = useState('');
  const [genreList , setGenreList] = useState([]);
  const [tab, setTab] = useState('1');
  const [storedFilms, setStoredFilms] = useState([])
    useEffect(() => {
        localStorage.setItem('filmsLike', []);
    }, []);

    useEffect(() => {

        if (!localStorage.getItem('filmsLike')) {
            localStorage.setItem('filmsLike', JSON.stringify([]));
        }

    }, []);// для создания хранилища при загрузке страницы

    const rateFilm = async (id, value) => {

        setFilms(prevFilms =>
            prevFilms.map(film =>
                film.id === id ? { ...film, rate: value } : film
            )
        );

        setStoredFilms(prevFilms =>
            prevFilms.map(film =>
                film.id === id ? { ...film, rate: value } : film
            )
        );

        const stored = JSON.parse(localStorage.getItem('filmsLike')) || [];

        const film = films.find(f => f.id === id);
        if (!film) return;

        const filmWithRating = { ...film, rate: value };

        const existingIndex = stored.findIndex(f => f.id === id);
        if (existingIndex !== -1) {
            stored[existingIndex] = filmWithRating;
        } else {
            stored.push(filmWithRating);
        }

        localStorage.setItem('filmsLike', JSON.stringify(stored));
    };// для оценки фильма и добавления в лок. стор
    useEffect(()=>{
        if (tab === '2') {
            showRatedFilms();
        }
    }, [tab])// для отрисовки оцененых фильмов
    const showRatedFilms = () => {
        const parsedData = JSON.parse(localStorage.getItem('filmsLike'));
        setStoredFilms(parsedData)

    }


    useEffect(() => {
        const createSession = async () => {
            try{
                const session = await fetch(urlForSession);
                const resSession = await session.json();


            }catch (e){
                console.log(`fail to create new session ${e}`)
            }
        }
        createSession();
    }, []);// для сессии

    useEffect(() => {
        const fetchGenre = async () => {
            try{
                const genreData = await fetch(urlForGenre);
                if(!genreData.ok){
                    console.error('что-то не так с жанрами...');
                }
                const res = await genreData.json();
                await setGenreList(res.genres);

            }catch(e){
                console.log(e)
            }
        }
        fetchGenre();
    }, []);// для жанров

    useEffect(() => {
        const getGenreNames = (genreIds) => {
            return genreIds
                .map(id => {
                    const match = genreList.find(g => g.id === id);
                    return match ? match.name : '';
                })
                .filter(Boolean)

        };

        const fetchFilm = async () => {

            try {
                setIsLoading(true);

                const result = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${myKey}&language=en-US&page=${numberOfPage}`);

                if(!result.ok){
                    console.error('что-то не так...')
                    return
                }
                const res = await result.json();
                const films = res.results.map(film => ({
                    title: film.title,
                    image: film.poster_path,
                    date: film.release_date,
                    genre: getGenreNames(film.genre_ids),
                    overview: film.overview,
                    voteAverage: film.vote_average,
                    rate:  0,
                    id: film.id
                }));
                setFilms(films);
                setError(null)
            }
            catch (error){
                setError(error.message);
                setFilms([]);
            }
            finally {
                setIsLoading(false);
            }
        }
        if(genreList.length > 0){
            fetchFilm();
        }
    }, [numberOfPage, genreList]);

    return (
        <div className='app'>
            {isLoading && <Spinner />}
            {error && <NoConnetion />}
            <MyTabs
                tab={tab}
                setTab={setTab}
            />
            {tab === '1' && (
                <>
                    <SearchForm
                        inputValue={value}
                        setInputValue={setValue}
                        setFilms={setFilms}
                        myKey={myKey}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        genreList={genreList}
                    />
                    {films.length !== 0 ?
                        <FilmList
                            films={films}
                            rateFilm={rateFilm}
                        /> : <NotFound/>
                    }
                    <Pag numberOfPage={numberOfPage}
                         setNumberOfPage={setNumberOfPage}
                    />
                </>
            )}
            {tab === '2' && (
                <>
                    <FilmList
                        films={storedFilms}
                    />
                </>

            )
            }
        </div>
  )
}

export default App
