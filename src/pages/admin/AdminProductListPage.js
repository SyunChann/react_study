import { useState } from 'react';
import { Button, Box } from '@mui/material';
import ProductCreateForm from '../components/productComponents/ProductCreateForm';
import AdminProductList from '../components/productComponents/AdminProductList';

export default function AdminProductListPage() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0); // 목록 갱신 트리거

    const handleCreated = () => {
        setShowCreateForm(false);
        setRefreshKey(k => k + 1);   // 리스트 리프레시 생성시 변경을 줘서 리스트 재 조회
    };

    return (
        <Box sx={{ p: 4 }}>
        <h1>상품 관리</h1>

        <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setShowCreateForm(v => !v)}
        >
            {showCreateForm ? '등록 닫기' : '상품 등록'}
        </Button>

        {showCreateForm && <ProductCreateForm onSuccess={handleCreated} />}

        {/* ★ refreshKey를 prop으로 전달 */}
        <AdminProductList refreshKey={refreshKey} />
        </Box>
    );
}