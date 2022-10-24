//reusable 3d carousel of objects
//put user's top artists,songs, albums, stations, etc. in a 3d carousel
//Path: src/components/carousel.jsx
import { useState } from 'react';
import Slider from "react-slick";
import './user-prefs.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';


const Preferences = (props) => {
   
        const NextArrow = ({ onClick }) => {
            return (
                <div className="arrow next" onClick={onClick}>
                    <FaArrowRight />
                </div>

            );
        }

        const PrevArrow = ({ onClick }) => {
            return (
                <div className="arrow prev" onClick={onClick}>
                    <FaArrowLeft />
                </div>
            );
        }
    
        const [imageIndex, setImageIndex] = useState(0);

        const settings = {
            infinite: true,
            lazyLoad: true,
            speed: 300,
            slidesToShow: 3,
            centerMode: true,
            centerPadding: 0,
            variableWidth: true,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            dots: true,
            swipe: true,
            beforeChange: (current, next) => setImageIndex(next)
        };

    return (
        <div>
            <Slider {...settings}>
                {props.map((preference, index) => (
                    <div className={index == imageIndex ? "slide active-slide" : "slide"}>
                        <img src={preference.image} alt={item.name} />
                        <p>{preference.name}</p>
                    </div>
                ))};
            </Slider>
        </div>
    );
}

export default Preferences;

