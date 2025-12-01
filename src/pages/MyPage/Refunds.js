import { Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const mock = [
    { id: "REF-10001", orderId: "ORD-240001", date: "2025-10-27", reason: "단순변심", status: "환불완료", amount: 56000 },
    { id: "REF-10002", orderId: "ORD-240002", date: "2025-11-01", reason: "상품하자", status: "승인대기", amount: 249000 },
];

export default function Refunds() {
    return (
        <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>취소/환불 내역</Typography>
        <TableContainer>
            <Table size="small">
            <TableHead>
                <TableRow>
                <TableCell>요청번호</TableCell>
                <TableCell>주문번호</TableCell>
                <TableCell>요청일</TableCell>
                <TableCell>사유</TableCell>
                <TableCell>상태</TableCell>
                <TableCell align="right">금액</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {mock.map((r) => (
                <TableRow key={r.id} hover>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.orderId}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.reason}</TableCell>
                    <TableCell><Chip size="small" label={r.status} color={r.status === "환불완료" ? "success" : "default"} /></TableCell>
                    <TableCell align="right">{r.amount.toLocaleString()}원</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Stack>
    );
}