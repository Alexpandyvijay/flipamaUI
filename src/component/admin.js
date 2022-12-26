import axios from "axios";
import React , {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import './admin.css';
import { userContext } from "./main";

export default function Admin(){
    const navigate = useNavigate();
    const [user] = useContext(userContext);
    const [product_data,setProduct_data]=useState({
        product_type : '',
        product_name : '',
        product_price : '',
        available_quantity : '',
        image : null
    })
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        console.log(product_data);
        const formData = new FormData();
        for(let key in product_data){
            formData.append(key, product_data[key]);
        }

        let res = await axios.post('https://flipamaserverv2.onrender.com/stockupdate',formData,{
            headers : {
                "authorization" : user.accessToken
            }
        });
        console.log(res);
        if(res.data.status === 'failed'){
            alert('Please login');
            setProduct_data({
                product_type : '',
                product_name : '',
                product_price : '',
                available_quantity : '',
                image : null
            })
            navigate('/');
        }else{
            setProduct_data({
                product_type : '',
                product_name : '',
                product_price : '',
                available_quantity : '',
                image : null
            })
            alert('successfully updated');
        }
    }
    return(
        <div className="admin">
            <h1>Add product details</h1>
            <form onSubmit={onSubmitHandler}>
                <label>Category</label>
                <input type='text' className='input' placeholder="Product Type" value={product_data.product_type} onChange={(e)=>(setProduct_data({...product_data,product_type : e.target.value}))}></input><br/>
                <label>Product Name</label>
                <input type='text' className='input' placeholder="Product Name" value={product_data.product_name} onChange={(e)=>(setProduct_data({...product_data,product_name : e.target.value}))}></input><br/>
                <label>Product Price</label>
                <input type='text' className='input' placeholder="Product Price" value={product_data.product_price} onChange={(e)=>(setProduct_data({...product_data,product_price : e.target.value}))}></input><br/>
                <label>Quantity</label>
                <input type='text' className='input' placeholder="quantity" value={product_data.available_quantity} onChange={(e)=>(setProduct_data({...product_data,available_quantity : e.target.value}))}></input><br/>
                <label>Image</label>
                <input type='file' className='file' onChange={(e)=>(setProduct_data({...product_data, image : e.target.files[0]}))}></input><br/>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}