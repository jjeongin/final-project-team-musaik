import NavBar from '../../components/NavBar/NavBar';
import Bubble from '../../components/Bubble/Bubble';
import BigBubbles from '../../components/BigBubbles/BigBubbles';
import album from '../../img/album.jpeg'

function Radio({image}) {
    return (
        <>
        <div className='Background'>
            <div>
                <Bubble img={album} id='1'/>
                <Bubble img={album} id='2'/>
                <Bubble img={album} id='3'/>
                <Bubble img={album} id='4'/>
                <Bubble img={album} id='5'/>
                <Bubble img={album} id='6'/>
            </div>
            {/* <BigBubbles img1={album} img2={album} /> */}
        </div>
        <NavBar /> 
        </>
    );
}

export default Radio