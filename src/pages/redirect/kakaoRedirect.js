import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function KakaoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const code = urlParams.searchParams.get('code');
    const mode = urlParams.searchParams.get('mode') || 'login'; // 기본값은 로그인

    if (!code) {
      alert('인가 코드가 없습니다.');
      return window.close?.();
    }

    axios.post('http://localhost:5000/api/auth/kakao', { code, mode })
    
      .then(res => {
        const { token, status } = res.data;
        if (token) localStorage.setItem('token', token);

        switch (status) {
          case 'new':
            alert('✅ 회원가입 성공!');
            break;
          case 'login':
            alert('😎 로그인 성공!');
            break;
          case 'exists':
            alert('⚠️ 이미 가입된 계정입니다.\n로그인 페이지에서 시도해 주세요.');
            break;
          default:
            alert('알 수 없는 상태입니다.');
        }

        const targetPath = status === 'new' || status === 'exists' ? '/signin' : '/';
        if (window.opener && !window.opener.closed) {
          window.opener.localStorage.setItem('token', token);
          window.opener.location.href = targetPath;
          window.close();
        } else {
          navigate(targetPath);
        }
        
      })
      .catch(err => {
        const status = err.response?.data?.status;
        if (status === 'not_found') {
          alert('😢 등록되지 않은 계정입니다.\n회원가입 후 로그인해 주세요.');
        } else {
          alert(`${mode === 'signup' ? '회원가입' : '로그인'} 중 문제가 발생했습니다.`);
          console.error('소셜 인증 실패:', err.response?.data || err.message);
        }

        window.close?.();
        navigate('/signin');
      });
  }, [navigate]);

  return <div>{`카카오 ${window.location.href.includes('mode=signup') ? '회원가입' : '로그인'} 처리 중입니다...`}</div>;
}

export default KakaoRedirect;
