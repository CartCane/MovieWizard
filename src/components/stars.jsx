import React, {useState} from 'react'

const StarRating = ({maxRating=5, color="white", size="1.5rem", onRating}) => {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    const starStyle = {
        display: "flex",
        alignItems: "center",
    }

    function starSelected(num){
        setRating(num);
        onRating(num);
    }
    function tempStarSelected(num){
        setTempRating(num);
    }

    function handleMouseLeave(){
        setTempRating(0);
    }

  return (
    <div style={starStyle}>
      {Array.from({length: maxRating}, (_, i)=><Star key={i+1} size={size} fill={rating > i ? color : tempRating > i ? color : ""} mouseLeave={handleMouseLeave} mouseEnter={()=>tempStarSelected(i+1)} onClick={()=>starSelected(i+1)}/>)}
        <p style={{color: "white", fontSize: size, marginLeft: "1rem"}}>{!rating ? tempRating : rating}</p>
    </div>
  )
}

export default StarRating

function Star({onClick, fill, size, mouseEnter, mouseLeave}){
    const style = {
        color: "white",
        fill,
        width: size,
    }
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={style} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={onClick}>
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        </svg>
    )
}
