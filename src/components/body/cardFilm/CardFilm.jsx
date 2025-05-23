import './cardFilm.css'
import Stars from "../../stars/Stars.jsx";
import { parseISO, format, isValid } from 'date-fns';
import CircleRaiitig from "../../circleRaiting/circleRaiitig.jsx";

function CardFilm({
                      title,
                      date,
                      image,
                      overview,
                      voteAverage,
                      genre,
                      rating,
                      rateFilm,
                      id
                  }) {
    const isoDate = date;
    const parsedDate = parseISO(isoDate);
    const formatDate =isValid(parsedDate)? format(parsedDate, 'MMMM d, yyyy') : 'ud';

    function truncateAtWord(str, max, ellipsis = '…') {
        if (str.length <= max) return str;
        let trimmed = str.substr(0, max);
        if (str[max] !== ' ') {
            trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
        }
        return trimmed + ellipsis;
    };

    const BorderedWords = ({ text }) => {
        const words = text.split(' '); // разбиваем текст на слова

        return (
            <div>
                {words.map((word, index) => (
                    <span
                        key={index}
                        style={{
                            display: 'inline-block',
                            border: '1px solid black',
                            padding: '4px',
                            margin: '2px'
                        }}
                    >
          {word}
        </span>
                ))}
            </div>
        );
    };

    return (

        <div className='filmCard'>
            <img className="filmPreview" alt='pictuce' src={`https://image.tmdb.org/t/p/w500/${image}`}/>
            <div className="infomationFilm">
                <div className='cupOfCard'>
                    <h2 className='titleOfFilm'>{title}</h2>
                    <CircleRaiitig
                        raiting={voteAverage}/>
                </div>
                <p className='date'>{formatDate}</p>
                <p className='tags'>{genre.map((word, index) => (
                    <span  key={index}
                           className='genres'
                    >
                        {word}
                    </span>
                ))}</p>
                <div className='overview'>{truncateAtWord(overview, 120)}</div>
                <Stars
                    value={rating}
                    onChange={(value) => rateFilm(id, value)}
                />
            </div>
        </div>

    )
}

export default CardFilm
