import { Card, Divider, Typography } from '@mui/material';
import { borderRadius, Box, Container, Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function OrderList() {
    const [open,setOpen] = useState(null);
    const [orders,setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${baseURL}/api/order`).then(res=>{
            if(res.data.success){
                setOrders(res.data.data);
            }
        })
        .catch(err => {
            console.error('주문 목록 조회 실패',err);
        })
    },[])
    
    console.log(orders);


    return (
        <div>
        <Container maxWidth='md'>
            <Box sx={{
                border:'1px solid #ddd',
                borderRadius:2,
                padding:3,
                marginTop:4
            }}>
                <Typography variant='h5'>주문 내역</Typography> 
                <Divider sx={{my:2}}/>
                { orders.length === 0 ? (
                    <Typography color='text.secondary'>주문 내역 없음</Typography>):(
                    orders.map(order => (
                <Card key={order.id}
                 sx={{p:2,borderRadius:2,mb:2, cursor:'pointer'}}
                 onClick={()=>navigate(`/order/${order.id}`)}>
                
                    <Stack direction='row' justifyContent='space-between' >
                        <Typography color='text.secondary'>{order.order_date.slice(0,10).replace(/-/g,'.')}</Typography>
                        <Typography>#{order.id}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' sx={{mt:1}}>
                        <Typography variant='body2'>총 결제 금액</Typography>
                        <Typography fontWeight='bold'>₩{order.total_price.toLocaleString()}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' sx={{mt:1}} onClick={(e)=> {
                        e.stopPropagation();
                        setOpen(prev =>(prev === order.id ? null : order.id ))
                        }}>
                        <Typography>상품 요약</Typography>
                        <Typography color='primary'>{open === order.id ? '▲' : '▼'}</Typography>
                    </Stack>
                       {open === order.id && (
                            <Box sx={{mt:1,pl:1,maxHeight:160,overflow:'auto'}}>
                                {order.items.map(item=>(
                                    <Typography key={item.productId} variant='body2' color='text.secondary'>
                                        - {item.productName} X {item.quantity}
                                    </Typography>
                                ))}

                            </Box>
                        )}
                </Card>
                    ))
                )}
            </Box>
        </Container>
        </div>
    );
};

