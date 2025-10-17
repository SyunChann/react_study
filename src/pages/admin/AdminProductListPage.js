import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCreateForm from '../components/productComponents/ProductCreateForm';
import AdminProductList from '../components/productComponents/AdminProductList';

export default function AdminProductListPage() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();

    const handleCreated = () => {
        setShowCreateForm(false);
        setRefreshKey(k => k + 1);
    };

    return (
        <Box>
        <h1>상품 관리</h1>

        <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setShowCreateForm(v => !v)}
        >
            {showCreateForm ? '등록 닫기' : '상품 등록'}
        </Button>

        {showCreateForm && <ProductCreateForm onSuccess={handleCreated} />}

        <AdminProductList
            refreshKey={refreshKey}
            onRowClick={(p) => navigate(`/product/${p.id}`)}
        />
        </Box>
    );
}