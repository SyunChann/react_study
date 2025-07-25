import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 이 컴포넌트는 구글 리디렉션을 처리합니다.
// 인가 코드를 받아 백엔드에 전달하고, 토큰과 사용자 데이터를 받아
// localStorage에 저장한 후 메인 애플리케이션으로 리디렉션합니다.
function GoogleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const mode = params.get("mode") || "login";

    if (!code) {
      alert("구글 인가 코드가 없습니다.");
      if (window.opener) {
        window.close();
      } else {
        navigate("/signin");
      }
      return;
    }

    axios
      .post("http://localhost:5000/api/auth/google", { code, mode })
      .then((res) => {
        // 백엔드는 token, user, status를 반환해야 함
        const { token, user, status } = res.data;

        // 로그인/회원가입 성공 시 호출되는 함수
        const handleSuccess = (targetPath) => {
          // user 객체가 없을 경우 에러 처리
          if (!user) {
            alert("로그인에 실패했습니다: 사용자 정보가 없습니다.");
            if (window.opener) window.close();
            else navigate("/signin");
            return;
          }

          if (window.opener && !window.opener.closed) {
            // 팝업에서 열린 경우, 부모 창의 localStorage에 저장 후 리디렉션
            window.opener.localStorage.setItem("token", token);
            window.opener.localStorage.setItem("user", JSON.stringify(user));
            window.opener.location.href = targetPath;
            window.close();
          } else {
            // 같은 창에서 처리하는 경우, localStorage 저장 후 페이지 이동
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate(targetPath);
          }
        };

        switch (status) {
          case "new":
            alert("✅ 회원가입 성공! 자동으로 로그인됩니다.");
            handleSuccess("/");
            break;
          case "login":
            alert("😎 로그인 성공!");
            handleSuccess("/");
            break;
          case "exists":
            alert(
              "⚠️ 이미 가입된 계정입니다.\n로그인 페이지에서 시도해 주세요."
            );
            if (window.opener && !window.opener.closed) {
              window.opener.location.href = "/signin";
              window.close();
            } else {
              navigate("/signin");
            }
            break;
          default:
            alert("알 수 없는 상태입니다.");
            if (window.opener) window.close();
            else navigate("/signin");
        }
      })
      .catch((err) => {
        const status = err.response?.data?.status;
        if (status === "not_found") {
          alert("😢 등록되지 않은 계정입니다.\n회원가입 후 로그인해 주세요.");
        } else {
          alert(
            `${
              mode === "signup" ? "회원가입" : "로그인"
            } 중 문제가 발생했습니다.`
          );
          console.error("소셜 인증 실패:", err.response?.data || err.message);
        }

        if (window.opener) {
          window.close();
        }
        navigate("/signin");
      });
  }, [navigate]);

  return (
    <div>{`구글 ${
      window.location.href.includes("mode=signup") ? "회원가입" : "로그인"
    } 처리 중입니다...`}</div>
  );
}

export default GoogleRedirect;
