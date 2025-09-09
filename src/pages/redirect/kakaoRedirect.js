import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/// 이 컴포넌트는 카카오 리디렉션을 처리합니다.
// 인가 코드를 받아 백엔드에 전달하고, 토큰과 사용자 데이터를 받아
// localStorage에 저장한 후 메인 애플리케이션으로 리디렉션합니다.
const baseURL = process.env.REACT_APP_BACKEND_URL;
function KakaoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");

    if (!code) {
      alert("카카오 인가 코드가 없습니다.");
      if (window.opener) {
        window.close();
      } else {
        navigate("/signin");
      }
      return;
    }

    axios
      .post(`${baseURL}/api/auth/kakao`, { code })
      .then((res) => {
        const { token, user } = res.data;

        if (token && user) {
          if (window.opener && !window.opener.closed) {
            window.opener.localStorage.setItem("token", token);
            window.opener.localStorage.setItem("user", JSON.stringify(user));
            window.opener.location.href = "/";
            window.close();
          } else {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
          }
        } else {
          throw new Error("토큰 또는 사용자 정보가 없습니다.");
        }
      })
      .catch((err) => {
        const message = err.response?.data?.message || "인증 중 문제가 발생했습니다.";
        alert(message);
        console.error("소셜 인증 실패:", err.response?.data || err.message);

        if (window.opener) {
          window.close();
        }
        navigate("/signin");
      });
  }, [navigate]);

  return <div>카카오 인증 처리 중입니다...</div>;
}

export default KakaoRedirect;
