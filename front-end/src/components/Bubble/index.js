import './index.css'

function Bubble({session, id}){
    /*
    session is a json containing info about each radio session
    e.g.
    session = {
        img: img_file, // album image of currently playing song
    }
    */

    return(
        <div>
            <img src={session.img} alt='Album Image' className={`bubble bubble-${id}`}/>
        </div>
    )
}

export default Bubble