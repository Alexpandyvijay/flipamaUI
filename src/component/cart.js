import React, { useState } from 'react';
import './cart.css';
import { useDispatch} from 'react-redux';

export default function Cart(props) {
    const dispatch = useDispatch();
    const [toggle,setToggle]= useState(true);
    const addToStoreHandler=()=>{
        dispatch({
            type : 'add',
            playload : {
                _id : props.obj._id,
                product_name : props.obj.product_name,
                product_price : props.obj.product_price,
                total_price : props.obj.product_price,
                quantity : 1
            }
        })
        setToggle(false);
    }
    const arrayBufferToBase64=(buffer)=> {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(props.obj.image.data.data);
    return (
        <div className='cart-box'>
            <div>
                <div id='middle'><img src={base64Flag+imageStr} alt='loading...'></img></div>
                <h5>{props.obj.product_name}</h5>
                <h5>{`Rs ${props.obj.product_price}`}</h5>
                {toggle && <button onClick={addToStoreHandler}>ADD TO CART</button>}
                {!toggle && <button>ADDED</button>}
            </div>
        </div>
    );
}