import React, {useState } from "react";
import './slider.css';

export default function Slider(){
    const [head, setHead]=useState({
        img1 : true,
        img2 : false,
        img3 : false
    });
    const onClickHandler=(e)=>{
        if(e===0){
            setHead({
                img1 : true,
                img2 : false,
                img3 : false
            });
        }else if(e===1){
            setHead({
                img1 : false,
                img2 : true,
                img3 : false
            });
        }else{
            setHead({
                img1 : false,
                img2 : false,
                img3 : true
            });
        }
    }
    return(
        <div className="slider">
            {head.img1 && <div className='image'><img src={require('../image/image8.jpg')} alt='img'></img></div>}
            {head.img2 && <div className='image'><img src={require('../image/image7.jpg')} alt='img'></img></div>}
            {head.img3 && <div className='image'><img src={require('../image/image6.jpg')} alt='img'></img></div>}
            <div className="dot">
                <span onClick={()=>onClickHandler(0)}></span>
                <span onClick={()=>onClickHandler(1)}></span>
                <span onClick={()=>onClickHandler(2)}></span>
            </div>
        </div>
    );
}