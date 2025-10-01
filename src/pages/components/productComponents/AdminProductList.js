import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, CircularProgress, Typography
    } from '@mui/material';

    const baseURL = process.env.REACT_APP_BACKEND_URL;

    export default function AdminProductList({ onRowClick, refreshKey }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const fetchAll = async () => {
        setLoading(true);
        setErr(null);
        try {
            const res = await axios.get(`${baseURL}/api/products`);
            setRows(res.data?.data ?? []);
        } catch (e) {
            console.error('상품 조회 에러:', e?.response?.status, e?.response?.data || e);
            setErr(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, [refreshKey]);

    if (loading) {
        return (
        <Box sx={{ p: 3, display: 'flex', gap: 1, alignItems: 'center' }}>
            <CircularProgress size={22} /> <Typography>불러오는 중...</Typography>
        </Box>
        );
    }

    if (err) {
        return (
        <Box sx={{ p: 3 }}>
            <Typography color="error">목록 조회 실패</Typography>
            <Button onClick={fetchAll} sx={{ mt: 1 }} variant="outlined">다시 시도</Button>
        </Box>
        );
    }

    return (
        <Box>
        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={fetchAll} variant="outlined">새로고침</Button>
        </Box>

        <TableContainer component={Paper}>
            <Table size="small">
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
                {rows.map((p) => (
                <TableRow
                    key={p.id}
                    hover
                    sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                    onClick={() => onRowClick?.(p)}
                >
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>{p.categories}</TableCell>
                    <TableCell>{p.stock_quantity}</TableCell>
                    <TableCell>{p.status}</TableCell>
                </TableRow>
                ))}
                {rows.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} align="center">상품이 없습니다.</TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
    }