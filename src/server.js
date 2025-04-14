const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const db = require('./db');

// .env 설정 불러오기
dotenv.config();

const app = express();

// ✅ CORS 설정
app.use(cors({
  origin: 'http://localhost:3000', // React 앱 주소
  credentials: true,
}));

// 요청 본문 파싱
app.use(express.json());

// API 라우팅
app.use('/api', authRoutes);

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
