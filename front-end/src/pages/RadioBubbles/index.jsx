import NavBar from '../../components/NavBar/NavBar';
import BigBubbles from '../../components/BigBubbles/BigBubbles';
import album from '../../img/album.jpeg'


function Radio({image}) {
    return (
        <>
        <div className='Background'>
            <BigBubbles img1={album} img2={album} />
        </div>
        <NavBar /> 
        </>
    );
}

export default Radio