import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import KakaoRedirectPage from './pages/kakao-redirect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/kakao-redirect" element={<KakaoRedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
