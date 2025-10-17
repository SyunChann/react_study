import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import ProductForm from "../components/productComponents/ProductForm";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    // 관리자 권한 여부 (예시: 추후 auth 연동)
    const isAdmin = true;

    const fetchOne = async () => {
        setLoading(true);
        console.log('🔍 요청 URL:', `${baseURL}/api/products/${id}`);
        try {
            const res = await axios.get(`${baseURL}/api/products/${id}`, { timeout: 5000});
            if (res.data?.success === false) {
                setProduct(null);
                return;
                }
            setProduct(res.data?.data ?? null);
        } catch (e) {
            const status = e.response?.status;
            console.error('상품 조회 실패:', status, e.response?.data || e);

            if (status === 404) {
            // 없음
                setProduct(null);
            } else {
                alert('상품 조회 중 오류가 발생했습니다.');
                setProduct(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOne();
    }, [id]);

    const handleSave = async (values) => {
        try {
        await axios.put(`${baseURL}/api/products/${id}`, values);
        alert("수정 완료");
        setEditMode(false);
        fetchOne();
        } catch (e) {
        alert("수정 실패");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
        await axios.delete(`${baseURL}/api/products/${id}`);
        alert("삭제 완료");
        navigate("/admin"); // 목록으로
        } catch (e) {
        alert("삭제 실패");
        }
    };

    if (loading) {
        return (
        <Box sx={{ p: 4 }}>
            <CircularProgress /> <Typography>불러오는 중…</Typography>
        </Box>
        );
    }

    if (!product) {
        return <Box sx={{ p: 4 }}>상품이 없습니다.</Box>;
    }

    return (
        <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
            상품 상세 (ID: {id})
        </Typography>

        <ProductForm
            initialValues={product}
            readOnly={!editMode}
            onSave={handleSave}
            onCancel={() => setEditMode(false)}
        />

        {isAdmin && (
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {!editMode && (
                <Button variant="contained" onClick={() => setEditMode(true)}>
                수정
                </Button>
            )}
            <Button color="error" variant="outlined" onClick={handleDelete}>
                삭제
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
                목록으로
            </Button>
            </Stack>
        )}
        </Box>
    );
}