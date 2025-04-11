import { useEffect } from "react";

export default function GoogleRedirect() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (window.opener) {
      window.opener.postMessage({ googleCode: code }, "*");
      window.close();
    }
  }, []);

  return <p>Google 로그인 처리 중...</p>;
}