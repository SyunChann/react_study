const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY;

/**
 * 카카오 로그인/회원가입 공통 함수
 */
export function KakaoAuth() {
  const redirectUri = `http://localhost:3000/kakao-redirect`;
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${redirectUri}&response_type=code&scope=account_email,profile_nickname`;

  const popup = window.open(
    kakaoAuthUrl,
    `kakao`,
    'width=500,height=600,top=100,left=100,resizable=no,scrollbars=yes'
  );

  if (!window.Kakao) {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoKey);
      }
    };

    script.onerror = () => {
      console.error('Kakao SDK 로딩 실패');
      popup.close();
    };

    document.head.appendChild(script);
  } else {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
  }
}
