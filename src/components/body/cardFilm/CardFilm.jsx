import './cardFilm.css'
import Stars from "../../stars/Stars.jsx";
import { parseISO, format, isValid } from 'date-fns';
import CircleRaiitig from "../../circleRaiting/circleRaiitig.jsx";

function CardFilm({ title, date, image, overview, raiting, genre }) {
    const isoDate = date;
    const parsedDate = parseISO(isoDate);
    const formatDate =isValid(parsedDate)? format(parsedDate, 'MMMM d, yyyy') : 'ud'
    function truncateAtWord(str, max, ellipsis = '…') {
        if (str.length <= max) return str;
        let trimmed = str.substr(0, max);
        if (str[max] !== ' ') {
            trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
        }
        return trimmed + ellipsis;
    }
    return (

        <div className='filmCard'>
            <img className="filmPreview" alt='pictuce' src={`https://image.tmdb.org/t/p/w500/${image}`}/>
            <div className="infomationFilm">
                <div className='cupOfCard'>
                    <h2>{title}</h2>
                    <CircleRaiitig
                        raiting={raiting}/>
                </div>
                <p className='date'>{formatDate}</p>
                <p className='tags'>{genre}</p>
                <p className='overview'>{truncateAtWord(overview, 221)}</p>
                <Stars/>
            </div>
        </div>

    )
}

export default CardFilm
