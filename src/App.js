import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import KakaoRedirect from './pages/redirect/kakaoRedirect';
import GoogleRedirect from './pages/redirect/googleRedirect'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/kakao-redirect" element={<KakaoRedirect />} />
        <Route path="/google-redirect" element={<GoogleRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
