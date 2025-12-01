import { Box, Divider, IconButton, InputBase, List, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const roomsMock = [
    { id: "r1", title: "주문문의 #ORD-240001", last: "네, 확인 중입니다." },
    { id: "r2", title: "환불요청", last: "영수증 첨부 부탁드립니다." },
    { id: "r3", title: "기타문의", last: "감사합니다." },
];

const messagesMock = {
    r1: [
        { role: "admin", text: "안녕하세요. 무엇을 도와드릴까요?" },
        { role: "me", text: "주문 #ORD-240001 배송 문의드립니다." },
        { role: "admin", text: "네, 확인 중입니다." },
    ],
    r2: [{ role: "me", text: "환불 요청하고 싶어요." }],
    r3: [{ role: "admin", text: "문의 감사합니다." }],
};

export default function Chat() {
    const [roomId, setRoomId] = useState("r1");
    const [text, setText] = useState("");
    const msgs = messagesMock[roomId] ?? [];

    return (
        <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>1:1 채팅</Typography>

        <Paper variant="outlined" sx={{ height: 520, display: "grid", gridTemplateColumns: { xs: "1fr", md: "280px 1fr" } }}>
            {/* 좌측: 대화방 목록 */}
            <Box sx={{ borderRight: { md: "1px solid" }, borderColor: "divider", overflow: "auto" }}>
            <List dense>
                {roomsMock.map(r => (
                <ListItemButton key={r.id} selected={r.id === roomId} onClick={() => setRoomId(r.id)}>
                    <ListItemText primary={r.title} secondary={r.last}
                    primaryTypographyProps={{ noWrap: true }}
                    secondaryTypographyProps={{ noWrap: true }}
                    />
                </ListItemButton>
                ))}
            </List>
            </Box>

            {/* 우측: 메시지 */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ p: 1.5, flex: 1, overflow: "auto" }}>
                {msgs.map((m, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: m.role === "me" ? "flex-end" : "flex-start", mb: 1 }}>
                    <Box sx={{ px: 1.2, py: 0.8, borderRadius: 2, bgcolor: m.role === "me" ? "primary.light" : "grey.100", color: m.role === "me" ? "primary.main" : "text.primary", maxWidth: "75%" }}>
                    {m.text}
                    </Box>
                </Box>
                ))}
            </Box>
            <Divider />
            <Box sx={{ p: 1 }}>
                <Paper component="form" variant="outlined"
                onSubmit={(e) => { e.preventDefault(); /* send 로직 자리 */ setText(""); }}
                sx={{ display: "flex", alignItems: "center", p: "2px 6px" }}>
                <InputBase placeholder="메시지를 입력하세요" sx={{ ml: 1, flex: 1 }} value={text} onChange={(e) => setText(e.target.value)} />
                <IconButton type="submit"><SendIcon /></IconButton>
                </Paper>
            </Box>
            </Box>
        </Paper>
        </Stack>
    );
}