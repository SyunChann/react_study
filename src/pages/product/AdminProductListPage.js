import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ProductCreateForm from '../components/productComponents/ProductCreateForm';
const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function AdminProductListPage() {
    const [products, setProducts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // 전체 조회
    useEffect(() => {
        axios.get(`${baseURL}/api/products`)
        .then(res => setProducts(res.data.data || []))
        .catch(err => console.error('상품 조회 에러:', err));
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <h1>상품 관리</h1>

            {/* 상품 등록 버튼 */}
            <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setShowCreateForm(!showCreateForm)}
            >
                {showCreateForm ? '등록 닫기' : '상품 등록'}
            </Button>

            {/* 상품 등록 폼 */}
            {showCreateForm && <ProductCreateForm />}

            {/* 상품 목록 테이블 */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>상품명</TableCell>
                        <TableCell>가격</TableCell>
                        <TableCell>카테고리</TableCell>
                        <TableCell>재고</TableCell>
                        <TableCell>상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>{p.id}</TableCell>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.price}</TableCell>
                                <TableCell>{p.categories}</TableCell>
                                <TableCell>{p.stock_quantity}</TableCell>
                                <TableCell>{p.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
