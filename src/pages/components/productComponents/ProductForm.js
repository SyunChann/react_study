import { useState, useEffect } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";

export default function ProductForm({
    initialValues,
    onSave,
    onCancel,
    readOnly = false,
    }) {
    const [form, setForm] = useState(initialValues);

    useEffect(() => {
        setForm(initialValues);
    }, [initialValues]);

    const change = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

    return (
        <Box sx={{ display: "grid", gap: 2, maxWidth: 520 }}>
            <TextField
                label="상품명"
                value={form?.name ?? ""}
                onChange={(e) => change("name", e.target.value)}
                InputProps={{ readOnly }}
            />
            <TextField
                label="가격"
                type="number"
                value={form?.price ?? ""}
                onChange={(e) => change("price", Number(e.target.value))}
                InputProps={{ readOnly }}
            />
            <TextField
                label="재고"
                type="number"
                value={form?.stock_quantity ?? ""}
                onChange={(e) => change("stock_quantity", Number(e.target.value))}
                InputProps={{ readOnly }}
            />
            <TextField
                label="카테고리"
                value={form?.categories ?? ""}
                onChange={(e) => change("categories", e.target.value)}
                InputProps={{ readOnly }}
            />
            <TextField
                label="상태"
                value={form?.status ?? ""}
                onChange={(e) => change("status", e.target.value)}
                InputProps={{ readOnly }}
            />

            {!readOnly && (
                <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={() => onSave(form)}>
                    저장
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                    취소
                </Button>
                </Stack>
            )}
        </Box>
    );
}