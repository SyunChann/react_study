import { Button, Divider, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function OrderDetail() {
    const sectionStyle = {
    p: 2,
    borderRadius: 2,
    border: '1px solid #eee',
    bgcolor: 'grey.50'
  };

    const {orderId} = useParams();
    const [orderDetail,setOrderDetail] =useState(null);
    const [items,setItems] = useState([]);
    useEffect(()=>{
        const fetchDetail = async () =>{
        try{
            const res = await axios.get(`${baseURL}/api/order/${orderId}`)
            setOrderDetail(res.data.order);
            setItems(res.data.items);
        }catch(err){
            console.error('상세 에러',err);
        }
    };
    fetchDetail();
    },[orderId]);

console.log('주문 상세',orderDetail);
console.log('상품',items);

  if(!orderDetail || !items){
    return(
        <Container maxWidth='md'>
            <Typography color='text.secondary'>불러온는중...</Typography>
        </Container>
    )
  }

  const handleCancel = async () =>{
    try{
        await axios.patch(`${baseURL}/api/order/${orderId}/cancel`);
        console.log('취소 완료');
    }catch(err){
        console.error('취소 실패',err);
    }
  }

  return (
    <div>
      <Container maxWidth="md">
        <Stack spacing={3} my={4}>
          
          <Stack spacing={1} direction='row' justifyContent='space-between'> 
            <Typography variant="h5" fontWeight="bold">
              주문 상세
            </Typography>
            <Button variant='outlined' color='error' size='small' onClick={handleCancel}>주문취소</Button>
            <Divider />
          </Stack>

          
          <Box sx={sectionStyle}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              주문 정보 
            </Typography>

            <Stack spacing={0.5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  주문번호
                </Typography>
                <Typography variant="body2">#{orderDetail.id}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  주문일자
                </Typography>
                <Typography variant="body2">{orderDetail.order_date.slice(0,10).replace(/-/g,'.')}</Typography>
              </Stack>
            </Stack>
          </Box>

        
          <Box sx={sectionStyle}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              배송지 정보
            </Typography>

            <Stack spacing={0.5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  수령인
                </Typography>
                <Typography variant="body2">{orderDetail.receiver_name}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  연락처
                </Typography>
                <Typography variant="body2">{orderDetail.receiver_phone}</Typography>
              </Stack>

              <Box sx={{ mt: 1 }}>
                <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  주소
                </Typography>
                <Typography variant="body2">
                  ({orderDetail.zipcode}) {orderDetail.addr}
                </Typography>
                </Stack>
                <Stack direction='row' justifyContent='flex-end'>
                <Typography variant="body2" >{orderDetail.detail_addr}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>

         
          <Box sx={sectionStyle}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              주문 상품
            </Typography>

          
            <Stack direction="row" sx={{ mb: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  상품명
                </Typography>
              </Box>
              <Box sx={{ width: 80, textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  수량
                </Typography>
              </Box>
              <Box sx={{ width: 120, textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  금액
                </Typography>
              </Box>
              <Box sx={{ width: 120, textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  소계
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 1 }} />

           {items.map(item =>(
            <Stack direction="row" key={item.product_id}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2">{item.product.name}</Typography>
              </Box>
              <Box sx={{ width: 80, textAlign: 'right' }}>
                <Typography variant="body2">x {item.quantity}</Typography>
              </Box>
              <Box sx={{ width: 120, textAlign: 'right' }}>
                <Typography variant="body2">₩{item.product_price.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ width: 120, textAlign: 'right' }}>
                <Typography variant="body2">₩{(item.quantity * item.product_price).toLocaleString()}</Typography>
              </Box>
            </Stack>
        ))}
          </Box>

         <Divider />
            <Stack direction='row' justifyContent='space-between'>
            <Typography variant="body2" color="text.secondary">
              총 결제 금액
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ₩{orderDetail.total_price.toLocaleString()}
            </Typography>
            </Stack>
          
        </Stack>
      </Container>
    </div>
  );
}
