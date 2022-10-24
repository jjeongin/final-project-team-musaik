import './UserAvatar.css';
import avi from "./img/avi.png";


function UserAvatar({text}){
    return(

        <div className='Avatar'>
            <img src={avi} alt="Avatar PlaceHolder" className='Avatar-Picture' />
            <h3>@{text}</h3>
        </div>



    )
}

export default UserAvatar