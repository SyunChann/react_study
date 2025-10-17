import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function PurchaseModal({open,onClose,product}){
    
    const [qty,setQty] = useState(1);
    const [openAdded,setOpenAdded] = useState(false);
    const openModal = () =>{
        onClose();
        
    }
    const dec = () => {
        setQty(q => Math.max(1,q-1));
    }
    const inc = () => {
        setQty(q => Math.min(99,q+1));
    }
    // 포맷
    const fmt = n => new Intl.NumberFormat('ko-KR').format(n);
    const buyNow = () => {
        console.log('바로구매:',{productId:product.id, qty });
        // navigate('/order')

    }
    const addToCart = async () => {
        try{
        await axios.post(`${baseURL}/api/cart/add`,{productId:product.id,quantity:qty});
        setOpenAdded(true);
        onClose();
        } catch(err){
            console.error('장바구니 추가 실패',err);
            
        }    
    }
    
  
    useEffect(() => {
        setQty(1);
    },[open]);

    return (
        <div>
         
            <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'> 
                <DialogTitle>
                    구매옵션
                </DialogTitle>
                <DialogContent dividers>
                   <Stack direction="row" alignItems="center" justifyContent="space-between">
                   <Typography display="inline">{product.name}</Typography> / <Typography display="inline" color="text.secondary">₩{product.price}</Typography>
                  
                   <Stack direction="row" alignItems="center" spacing={1.5}>
                    <IconButton onClick={dec}>-</IconButton>
                    <Typography>{qty}</Typography>
                    <IconButton onClick={inc}>+</IconButton>
                   </Stack>
                   </Stack>
                  
                   <Stack direction="row" justifyContent="space-between">
                   <Typography>합계</Typography>  
                   <Typography variant='h6'>₩{fmt(product.price*qty)}</Typography>
                   </Stack>
                </DialogContent>
                
                <DialogActions>
                    <Stack direction="row" spacing={2}>
                    <Button variant='contained' onClick={buyNow}>바로구매</Button>
                    <Button variant='outlined' onClick={addToCart}>장바구니</Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdded} onClose={ () => setOpenAdded(false) } fullWidth maxWidth='xs'>
            <DialogTitle>
                장바구니에 담겼습니당!
            </DialogTitle>
            <DialogContent dividers>
            <a href='/cart'>🛒 장바구니로 이동하기</a>
            </DialogContent>
            </Dialog>
        </div>
    );
};

