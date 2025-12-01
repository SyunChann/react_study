import React, { useEffect, useState } from 'react';
import AddressForm from '../components/order/AddressForm';
import { Card,Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BACKEND_URL;
export default function OrderCreate() {

    const [openAddrModal,setOpenAddrModal] = useState(false);

    const [address,setAddress] = useState({
        zipcode:'',
        addr:'',
        detailAddr:'',
        receiverName:'',
        receiverPhone:'',
    });

    const [draftAddr,setDraftAddr] = useState({
        zipcode:'',
        addr:'',
        detailAddr:'',
        receiverName:'',
        receiverPhone:'',
    });

    const {state} = useLocation();
    const selectedItems = state?.selectCartItems || [];
    const totalPrice = selectedItems.reduce(
        (sum,item) => sum + (item.product.price * item.quantity),0
    );

    console.log(selectedItems)

    useEffect(()=>{
        axios.get(`${baseURL}/api/order/address`).then(res=>{
            if(res.data.success){
                setAddress(res.data.address);
            }
        });
    },[]);

    const handleCreate = async () =>{
        const body={
            zipcode:address.zipcode,
            addr:address.addr,
            detailAddr:address.detailAddr,
            receiverName:address.receiverName,
            receiverPhone:address.receiverPhone,
            cartItemIds:selectedItems.map(item => item.id),
            totalPrice:totalPrice
        };
        
        try{
            await axios.post(`${baseURL}/api/order`,body);
            alert('주문 생성 완료');
            

        }catch(err){
            console.log('주문 생성 실패',err)
            alert('주문 생성 실패');
        }
    };

    return (
        <div>
        <Container maxWidth='md'>
            <Box
            sx={{
                border:'1px solid #ddd',
                borderRadius:2,
                padding:3,
                marginTop:4
            }}>
                <Stack direction='row' justifyContent='space-between' alignContent='center' sx={{mb:2}} >
                <Typography variant='h6' fontWeight={700}  sx={{mt:1}}>배송정보</Typography>
                <Button variant='outlined'
                onClick={()=>{
                  setDraftAddr(address);
                    setOpenAddrModal(true);
                    }}
                 >배송정보수정
                 </Button>
                 </Stack>
                <Divider sx={{my:2}}/>

            <Stack spacing={1}>
                <Typography>이름: {address.receiverName}</Typography>
                <Typography>연락처: {address.receiverPhone}</Typography>
                <Typography>주소: {address.addr} {address.detailAddr}</Typography>
            </Stack>

            </Box>

            <Dialog open={openAddrModal} onClose={()=>setOpenAddrModal(false)}>
                <DialogTitle>배송정보수정</DialogTitle>
                <DialogContent><AddressForm value={draftAddr} onChange={setDraftAddr}/></DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={()=>{
                        setAddress(draftAddr);
                        setOpenAddrModal(false);
                    }}>확인</Button>
                    <Button onClick={()=> setOpenAddrModal(false)}>취소</Button>
                </DialogActions>
            </Dialog>

            <Card sx={{mt:4,borderRadius:2}}>
            <Typography variant='h6' fontWeight={700} sx={{mt:1,mb:2,ml:2}} >주문 상품</Typography>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell align='center'>상품명</TableCell>
                        <TableCell align='center'>가격</TableCell>
                        <TableCell align='center'>수량</TableCell>
                        <TableCell align='center'>합계</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {selectedItems.map(item=>(
                        <TableRow key={item.id}>
                            <TableCell align='center'>{item.product.name}</TableCell>
                            <TableCell align='center'>{item.product.price.toLocaleString()}원</TableCell>
                            <TableCell align='center'>{item.quantity}</TableCell>
                         <TableCell align='center'>{(item.product.price * item.quantity).toLocaleString()}원</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Divider sx={{my:2}}/>
            <Stack direction='row' justifyContent='space-between' sx={{mr:4}}>
            <Typography variant='h6' sx={{ml:2}}>총합: </Typography>
            <Typography variant='h6'>{totalPrice.toLocaleString()}원</Typography>
            </Stack>
            </Card>

            <Stack direction='row' justifyContent='flex-end'>
            <Button variant='contained' sx={{mt:3}} onClick={handleCreate}>
                결제
            </Button>
            </Stack>


        </Container> 
        </div>
    );
}
