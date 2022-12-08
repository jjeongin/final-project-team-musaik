import './Albums.css';
import placeHolder from '../../img/album.jpeg'
import {useState, useEffect} from "react"



function Albums({text, image1,image2,image3}){

    
    return(
        <div className='Carousel'>
            <h2 className='Category-Name'>{text}</h2>
            <img src={image1}  alt="Album PlaceHolder" className='Album-PlaceHolder'/>
            <img src={image2}  alt="Album PlaceHolder" className='Album-PlaceHolder'/>
            <img src={image3}  alt="Album PlaceHolder" className='Album-PlaceHolder'/>
        </div>

    )
}

export default Albums