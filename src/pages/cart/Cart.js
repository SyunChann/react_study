import axios from 'axios';
import React, { useEffect, useState } from 'react';

 
const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function Cart(){
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        const fetchCart = async () =>{
            try{
                const res = await axios.get(`${baseURL}/api/cart`);
                setCart(res.data.data);
            } catch(err){
                console.error('장바구니 불러오기 실패',err);
            }   
        };
        fetchCart();
    },[])
    
    return(
        <div>
            <h1>장바구니</h1>
            {cart.length === 0 ? (
                <p> 장바구니가 비었습니다.</p>
            ): (
                <ul>
                    {cart.map((product) => (
                        <li key = {product.id}>
                            {product.product?.name} - {product.quantity}개
                        </li>
                    ))}
                </ul>

            )}

        </div>
    );
}