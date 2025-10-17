import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/cart`);
      setCart(res.data.data || []);
    } catch (err) {
      console.error("장바구니 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/cart/item`, { data: { cartId: id } });
      fetchCart();
    } catch (err) {
      console.error("상품 삭제 실패", err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${baseURL}/api/cart`);
      fetchCart();
    } catch (err) {
      console.error("장바구니 비우기 실패", err);
    }
  };
  const updateQuantity = async (id, newQty) => {
  try {
    await axios.patch(`${baseURL}/api/cart/item`, { cartId: id, quantity: newQty });
    fetchCart();
  } catch (err) {
    console.error('수량 조절 실패', err);
  }
};


  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (loading)
    return (
      <Stack alignItems="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>로딩 중...</Typography>
      </Stack>
    );

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, mt: 8, maxWidth: 800, mx: "auto", borderRadius: 3 }}
    >
      {/* 헤더 */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          🛒 장바구니
        </Typography>
        {cart.length > 0 && (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={clearCart}
          >
            전체 비우기
          </Button>
        )}
      </Stack>

      {/* 본문 */}
      {cart.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ py: 8 }}>
          장바구니가 비었습니다.
        </Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>상품명</TableCell>
                <TableCell align="center">수량</TableCell>
                <TableCell align="right">가격</TableCell>
                <TableCell align="right">합계</TableCell>
                <TableCell align="center">삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product?.name}</TableCell>
                  <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <Button
                    size="small"
                    variant="outlined"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    >
                    -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                    size="small"
                    variant="outlined"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                    +
                    </Button>
                </Stack>
                </TableCell>

                  <TableCell align="right">
                    {item.product?.price?.toLocaleString()}원
                  </TableCell>
                  <TableCell align="right">
                    {(item.product?.price * item.quantity).toLocaleString()}원
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => deleteItem(item.id)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* 총합 */}
          <Stack direction="row" justifyContent="flex-end" mt={4}>
            <Typography variant="h6" fontWeight={600}>
              총합:{" "}
              <Typography
                component="span"
                color="primary"
                fontWeight={700}
                variant="h6"
              >
                {totalPrice.toLocaleString()}원
              </Typography>
            </Typography>
          </Stack>
        </>
      )}
    </Paper>
  );
}
