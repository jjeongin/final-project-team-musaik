import './Bubble.css'

function Bubble({img, id}){
    return(
        <div>
            <img src={img} alt='Album Image' className={`bubble bubble-${id}`}/>
        </div>
    )
}

export default Bubble