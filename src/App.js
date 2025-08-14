import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './features/auth/authSlice';
import Blog from "./pages/Blog/Blog";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import KakaoRedirect from './pages/redirect/kakaoRedirect';
import GoogleRedirect from './pages/redirect/googleRedirect'
import MyPage from './pages/MyPage/MyPage';
import Notifier from "./pages/components/Notifier";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // 이 effect는 초기 로드 시와 localStorage가 변경될 때마다 실행됩니다.
  // localStorage의 로그인 상태를 Redux 상태와 동기화합니다.
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        try {
          const parsedUser = JSON.parse(user);
          // Redux에 이미 로그인되어 있지 않은 경우에만 로그인 처리
          if (!isLoggedIn) {
            dispatch(login(parsedUser));
          }
        } catch (error) {
          console.error("Failed to parse user data from localStorage", error);
           // 파싱에 실패하면 상태 불일치를 방지하기 위해 로그아웃 처리
          dispatch(logout());
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        // 토큰이나 사용자 정보가 없으면 로그인 상태를 로그아웃으로 유지
        if (isLoggedIn) {
          dispatch(logout());
        }
      }
    };

    // 컴포넌트가 마운트될 때 즉시 로그인 상태 확인
    checkLoginStatus();

    // storage 변경 이벤트 리스너 등록 (예: 팝업에서 로그인한 경우 대응)
    window.addEventListener('storage', checkLoginStatus);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [dispatch, isLoggedIn]); // 의존성 배열: 필요한 경우에만 effect 실행

  return (
    <Router>
      <Notifier />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Blog /> : <SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/kakao-redirect" element={<KakaoRedirect />} />
        <Route path="/google-redirect" element={<GoogleRedirect />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
