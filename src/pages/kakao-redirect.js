import { useEffect } from 'react';
import axios from 'axios';

function KakaoRedirectPage() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      axios.post('http://localhost:5000/api/auth/kakao/signup', { code })
        .then(res => {
          console.log('카카오 응답:', res.data.user);

          if (res.data.status === 'new') {
            alert('✅ 회원가입 성공!');
          } else {
            alert('😎 이미 가입된 계정입니다.');
          }

          window.close(); // 팝업 닫기
        })
        .catch(err => {
          console.error('회원가입 실패:', err);
          alert('회원가입 중 문제가 발생했습니다.');
          window.close(); // 실패해도 닫기
        });
    }
  }, []);

  return <div>회원가입 처리 중입니다...</div>;
}

export default KakaoRedirectPage;
