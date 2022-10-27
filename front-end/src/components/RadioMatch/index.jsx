import './index.css'

function RadioMatch({img1, img2}){
    return(
        <div className='Match'>
            <h2>Radio Match</h2>
            <div className='Match-Card'>
                <div className='user'>
                    <img className='image' src={img1} alt='user' />
                </div>
                <div className = 'match'>
                    <img className='image' src={img2} alt='match' />
                </div>
            </div>
        </div>
    )
}

export default RadioMatch