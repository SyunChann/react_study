import { useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function KakaoLoginRedirect() {
  // const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('🔁 redirect code:', code); // ✅ 디버깅 필수

    if (code) {
      axios.post('http://localhost:5000/api/auth/kakao/login', { code })
        .then(res => {
          alert('✅ 로그인 성공!');
          localStorage.setItem('token', res.data.token);
          window.close(); // 팝업 닫기
        })
        .catch(err => {
          console.error('로그인 실패:', err);
          alert('로그인 중 오류 발생');
          window.close();
        });
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}

export default KakaoLoginRedirect;