import './Albums.css';
import placeHolder from '../../img/album.jpeg'




function Albums({text, image}){
    return(

        <div className='Carousel'>
            <h2 className='Category-Name'>{text}</h2>
            <img src={image} alt="Album PlaceHolder" className='Album-PlaceHolder'/>
            <img src={image} alt="Album PlaceHolder" className='Album-PlaceHolder'/>
            <img src={image} alt="Album PlaceHolder" className='Album-PlaceHolder'/>
        </div>

    )
}

export default Albums