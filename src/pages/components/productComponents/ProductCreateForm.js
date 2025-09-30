//보류
import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function ProductCreateForm() {
    const [form, setForm] = useState({ name: '', price: '', categories: '' });

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${baseURL}/api/products`, form);
            alert(res.data.message || '상품 등록 성공');
            setForm({ name: '', price: '', categories: '' }); // 초기화
        } catch (err) {
            console.error('상품 등록 에러:', err);
            alert('상품 등록 실패');
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
                label="카테고리"
                value={form.categories}
                onChange={(e) => setForm({ ...form, categories: e.target.value })}
            />
            <Button variant="contained" onClick={handleSubmit}>
                상품 등록
            </Button>
        </Box>
    );
}
