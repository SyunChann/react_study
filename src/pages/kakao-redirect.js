import { useEffect } from 'react';

export default function KakaoRedirect() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (window.opener) {
      window.opener.postMessage({ kakaoCode: code }, "*");
      window.close();
    }
  }, []);

  return <p>KaKao 로그인 처리 중...</p>;
}