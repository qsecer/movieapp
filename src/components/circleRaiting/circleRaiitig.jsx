import './circleRaiitig.css'

const CircleRaiitig = ({ raiting }) => {
    if(raiting <= 3){
        return (
            <div className='circleRaiitig O3'>
                {Math.floor(raiting * 10)/10}
            </div>
        )
    }else if(raiting > 3 && raiting <= 5){
        return (
            <div className='circleRaiitig t5'>
                {Math.floor(raiting * 10)/10}
            </div>
        )
    }else if(raiting > 5 && raiting <= 7){
        return (
            <div className='circleRaiitig f7'>
                {Math.floor(raiting * 10)/10}
            </div>
        )
    }else if(raiting > 7){
        return (
            <div className='circleRaiitig h7'>
                {Math.floor(raiting * 10)/10}
            </div>
        )
    }


};

export default CircleRaiitig;