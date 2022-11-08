import NavBar from '../../components/NavBar/NavBar';
import cover_one from '../../img/bubblecover1.jpeg'
import cover_two from '../../img/bubblecover2.jpeg'
import cover_three from '../../img/bubblecover3.jpg'
import cover_four from '../../img/bubblecover4.png'
import cover_five from '../../img/bubblecover5.jpeg'
import cover_six from '../../img/bubblecover6.jpg'
import cover_seven from '../../img/bubblecover7.jpg'
import cover_eight from '../../img/bubblecover8.jpg'
import radio from '../../img/radio.svg'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './index.css'

function Radio() {

    const createStation = async () => {
        const res = await axios.post(`/api/create-session`);
        console.log(res);
        window.location = `/web-playback`;
    }

    return (
        <>
        <div onClick ={createStation}>
          <img src={radio} />
        </div>
        <div className="Radio">
            <div className="bubble_div" style = {{display: 'flex', flexDirection: 'column'}}>
                <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center',margin: '3vh 0 1vh 0'}}>
                    <div className="float-child">
                        <div className="bubble_one">
                            <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_one} alt="Cover 1"/>
                        </div>
                    </div>
                    <div className="float-child">
                        <div className="bubble_two">
                            <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_two} alt="Cover 2"/>
                        </div>
                    </div>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '0 8% 1vh 0'}}>
                    <div className="float-child">
                        <div className="bubble_three">
                            <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_three} alt="Cover 3"/>
                        </div>
                    </div>
                    <div className="float-child">
                        <div className="bubble_four">
                            <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_four} alt="Cover 4"/>
                        </div>
                    </div>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '0 0 1vh 6%'}}>
                    <div className="float-child">
                        <div className="bubble_five">
                            <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_five} alt="Cover 5"/>
                        </div>
                    </div>
                    <div className="float-child">
                        <div className="bubble_six">
                            <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_six} alt="Cover 6"/>
                        </div>
                    </div>
                </div>
                <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginRight: '7%'}}>
                    <div className="float-child">
                        <div className="bubble_seven">
                            <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_seven} alt="Cover 7"/>
                        </div>
                    </div>
                    <div className="float-child">
                        <div className="bubble_eight">
                            <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_eight} alt="Cover 8"/>
                        </div>
                    </div>
                </div>    
            </div>
            <NavBar/>
            </div>
        </>
    );
}

export default Radio