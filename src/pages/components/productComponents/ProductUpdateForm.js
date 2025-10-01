import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function ProductUpdateForm({ productId, initialData }) {
    const [form, setForm] = useState({
        name: initialData?.name || '',
        price: initialData?.price || '',
        stock_quantity: initialData?.stock_quantity || '',
        categories: initialData?.categories || '',
        status: initialData?.status || '',
    });

    const handleSubmit = async () => {
    try {
            const res = await axios.put(`${baseURL}/api/products/${productId}`, form);
            alert(res.data.message || '상품 수정 성공');
        } catch (err) {
            console.error('상품 수정 에러:', err);
            alert('상품 수정 실패');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
            <TextField
                label="상품명"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
                label="가격"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <TextField
                label="재고 수량"
                type="number"
                value={form.stock_quantity}
                onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
            />
            <TextField
                label="카테고리"
                value={form.categories}
                onChange={(e) => setForm({ ...form, categories: e.target.value })}
            />
            <TextField
                label="상태"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
            />
            <Button variant="contained" onClick={handleSubmit}>
                상품 수정
            </Button>
        </Box>
    );
}