
import "./filmList.css"

import CardFilm from "../cardFilm/CardFilm.jsx";



function FilmList(
    { films }
) {

    return (

        <ul className='filmList'>
            {films.map(film => (
                <li key={film.id}>
                    <CardFilm
                    title={film.title}
                    date={film.date}
                    image={film.image}
                    genre={film.genre}
                    overview={film.overview}
                    raiting={film.raiting}
                    />
                </li>

            ))}
        </ul>
    )
}

export default FilmList