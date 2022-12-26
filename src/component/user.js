import React, { useEffect,useState,useContext} from "react";
import axios from 'axios';
import Cart from './cart';
import {userContext} from './main.js';

export default function User(){
    let navbar = ['electronics','Fashion','Furniture','Grocery'];
    const [user] = useContext(userContext);
    const [cart,setCart]=useState([]);
    const [category,setCategory] = useState({
        product_type : 'electronics',
        from : 0,
        to : Infinity
    });

    useEffect(()=>{
        const fetchData=async()=>{
            let res = await axios.get(`https://flipamaserverv2.onrender.com/products/${category.product_type}?from=${category.from||0}&to=${category.to||Infinity}`,{
                headers : {
                    'authorization' : user.accessToken
                }
            })
            if(res.data.status==='failed'){
                res.data.message==='no Product'?setCart(res.data.message):setCart('Please login');
            }else{
                setCart(res.data.data);
            }
        }
        fetchData();
    },[category,user])
    
    const onChangeDropdown = (e)=> {
        e.preventDefault();
        let range = e.target.value;
        let priceRange = range.split('-');
        if(priceRange[1] === 'Infinity'){
            priceRange[1] = Infinity;
        }else{
            priceRange[1] = parseInt(priceRange[1]);
        }
        setCategory({product_type: category.product_type, from : parseInt(priceRange[0]), to : priceRange[1]});
    }

    return(
        <div className='user'>
            <div className='nav-bar'>
                <h3>Filter</h3>
                <div className='list'>
                    <label>Price range</label>
                    <select onChange={onChangeDropdown} className='range'>
                        <option value='0-Infinity'>All</option>
                        <option value='500-5000'>500-5000</option>
                        <option value='5000-10000'>5000-10000</option>
                        <option value='10000-15000'>10000-15000</option>
                        <option value='15000-20000'>15000-20000</option>
                        <option value='20000-25000'>20000-25000</option>
                        <option value='25000-30000'>25000-30000</option>
                        <option value='30000-35000'>30000-35000</option>
                        <option value='35000-40000'>35000-40000</option>
                        <option value='40000-50000'>40000-50000</option>
                    </select>
                    {navbar.map((list,i)=>{
                        return <div key={i+'a'} onClick={()=>{setCategory({...category,product_type : list})}}>{list}</div>
                    })}
                </div>
            </div>
            <div className='display'>
                <div className='product-list'>
                    {
                        cart==="no Product"||cart==="Please login"?<h3 id='login'>{cart}</h3>:cart.map((item,i)=>{
                            return <Cart key={item._id} obj={item}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}