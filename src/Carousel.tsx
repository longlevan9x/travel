import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
    const [carouselHeight, setCarouselHeight] = useState(0);

    useEffect(() => {
        const headerElement = document.getElementById('header');
        if (headerElement) {
            const headerHeight = headerElement.clientHeight;
            const windowHeight = window.innerHeight;
            setCarouselHeight(windowHeight - headerHeight);
        }
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const carouselStyles = {
        height: carouselHeight,
    };

    return (
        <div className="overflow-hidden" style={carouselStyles} >
            <Slider {...settings} useCSS={true} className="h-full">
                <div className="w-full h-full">
                    <img
                        src="/path/to/slide1.jpg"
                        alt="Slide 1"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full h-full">
                    <img
                        src="/path/to/slide2.jpg"
                        alt="Slide 2"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full h-full">
                    <img
                        src="/path/to/slide3.jpg"
                        alt="Slide 3"
                        className="w-full h-full object-cover"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
