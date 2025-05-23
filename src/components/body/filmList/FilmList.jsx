
import "./filmList.css"

import CardFilm from "../cardFilm/CardFilm.jsx";



function FilmList(
    {films, rateFilm}
) {

    return (

        <ul className='filmList'>
            {films.map(film => (
                <li key={film.id} className='li-filmCard'>
                    <CardFilm

                    title={film.title}
                    date={film.date}
                    image={film.image}
                    genre={film.genre}
                    overview={film.overview}
                    voteAverage={film.voteAverage}
                    rateFilm={rateFilm}
                    id={film.id}
                    rating={film.rate}

                    />
                </li>

            ))}
        </ul>
    )
}

export default FilmList