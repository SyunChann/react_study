import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function KakaoRedirectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');

        if (code) {
            axios.post('http://localhost:5000/api/auth/kakao/signup', { code })
                .then(res => {
                    console.log('회원가입 성공:', res.data.user);
                    alert('회원가입 성공!');
                    navigate('/');
                })
                .catch(err => {
                    console.error('회원가입 실패:', err);
                    alert('회원가입 중 문제가 발생했습니다.');
                });
        }
    }, [navigate]);

    return <div>회원가입 처리 중입니다...</div>;
}

export default KakaoRedirectPage;