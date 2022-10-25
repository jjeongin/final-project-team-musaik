import './UserAvatar.css';
import avi from "./img/avi.png";


function UserAvatar({text}){
    return(

        <div className='Avatar'>
            <img src={avi} alt="Avatar PlaceHolder" className='Avatar-Picture' />
            <h4>@{text}</h4>
        </div>



    )
}

export default UserAvatar