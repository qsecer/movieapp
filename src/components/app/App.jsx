import { useState, useEffect } from 'react';
import FilmList from "../body/filmList/FilmList.jsx";
import SearchForm from "../header/SearchForm.jsx";
import Pag from "../footer/Pagination.jsx";
import './app.css'
import Spinner from "../spin/Spin.jsx";
import NoConnetion from "../Alert/Alert.jsx";
function App() {

  const myKey = '7812d20e5e0384301cc6da5809c89aa2';

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numberOfPage, setNumberOfPage] = useState(1);
  const [value, setValue] = useState('');
  const [genreList , setGenreList] = useState([]);
  const urlForGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${myKey}&language=en-US`;
    useEffect(() => {
        const fetchGenre = async () => {
            try{
                const genreData = await fetch(urlForGenre);
                if(!genreData.ok){
                    console.error('что-то не так с жанрами...');
                }
                const res = await genreData.json();
                await setGenreList(res.genres);
                console.log(genreList);
            }catch(e){
                console.log(e)
            }
        }
        fetchGenre();
    }, []);

    useEffect(() => {
        const getGenreNames = (genreIds) => {
            return genreIds.map(id => {
                const match = genreList.find(g => g.id === id);
                return match ? match.name : '';
            }).filter(Boolean);
        };

        const fetchFilm = async () => {
            try {
                setIsLoading(true)
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
                    raiting: film.vote_average,
                    id: film.id,
                    key: film.id
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

    if(isLoading) return(<Spinner/>)
    if (error) return <NoConnetion/>;
  return (
      <div className='app'>
        <SearchForm
            inputValue={value}
            setInputValue={setValue}
            setFilms={setFilms}
            myKey={myKey}
        />
        <FilmList films={films}/>
        <Pag numberOfPage={numberOfPage}
             setNumberOfPage={setNumberOfPage}
        />
      </div>
  )
}

export default App
