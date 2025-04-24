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
        /* 추후 확장성을 위한 user 추가 
        localstorage 활용 가능 ... */        
        // const { status, token, user } = res.data;
        
        const { status, token } = res.data;

        if (status === 'new') {
          alert('✅ 회원가입 성공!');
          if (token) localStorage.setItem('token', token);
          window.close?.();
          navigate('/');
        } else if (status === 'login') {
          alert('😎 로그인 성공!');
          if (token) localStorage.setItem('token', token);
          window.close?.();
          navigate('/');
        } else if (status === 'exists') {
          alert('⚠️ 이미 가입된 계정입니다.\n로그인 페이지에서 시도해 주세요.');
          window.close?.();
          navigate('/');
        }
      })
      .catch(err => {
        const status = err.response?.data?.status;
      
        if (status === 'not_found') {
          alert('😢 등록되지 않은 계정입니다.\n회원가입 후 로그인해 주세요.');
          window.close?.();
          navigate('/');
          return;
        }
      
        console.error(`${mode} 실패:`, err.response?.data || err.message);
        alert(`${mode === 'signup' ? '회원가입' : '로그인'} 중 문제가 발생했습니다.`);
        window.close?.();
        navigate('/');
      });      

  }, [navigate]);

  return <div>{`카카오 ${window.location.href.includes('mode=signup') ? '회원가입' : '로그인'} 처리 중입니다...`}</div>;
}

export default KakaoRedirect;
