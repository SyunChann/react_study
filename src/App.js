import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp"; // 회원가입 페이지 추가
import KakaoRedirectPage from './pages/kakao-signUp-redirect';//테스트

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* 기본 페이지 */}
        <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 */}
        {/* ✅ 카카오 리다이렉트용 임시 라우트 */}
        <Route path="/kakao-redirect" element={<KakaoRedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;