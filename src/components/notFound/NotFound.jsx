
import brokenCamera from '../images/cd2b6ba7-3b92-4e1f-8f28-6185b347481a.png';

const notFound = () => {
    return (
        <div className='notFound'>
            Ничего не найденно
            <img className='brokenCamera' src={brokenCamera}/>
        </div>)
}
export default notFound