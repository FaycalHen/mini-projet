import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./Slider.scss";
const Slider = () => {
    const [currentSlide,setCurrentSlide]=useState(0);
    const data=[
        "/img/main.png",
        "/img/secend.png",
        "/img/thirdd.png",
    ];

    const previousS=()=>{
        setCurrentSlide(currentSlide === 0 ? 2 : currentSlide-1)
    }
    const nextS=()=>{
        setCurrentSlide(currentSlide === 2 ? 0 : currentSlide+1 )
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, [currentSlide]);
    return (
    <div className='slider'>
        <div className="container" style={{transform:`translateX(-${currentSlide * 100}vw)`}}>
            <img src={data[0]} alt="" />
            <img src={data[1]} alt="" />
            <img src={data[2]} alt="" />
            
        </div>
        <div className="icons">
            <div className="icon" onClick={previousS}><ArrowBackIcon/></div>
            <div className="icon" onClick={nextS}><ArrowForwardIcon/></div>
        </div>
    </div>
  )
}

export default Slider;