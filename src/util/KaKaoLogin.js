const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY;

export function kakaoLogin() {
  if (!window.Kakao) {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoKey);
      }
      loginWithKakao();
    };

    script.onerror = () => {
      console.error('Kakao SDK 로딩 실패');
    };

    document.head.appendChild(script);
  } else {
    // 이미 로드되었으면 바로 실행
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
    loginWithKakao();
  }
}

function loginWithKakao() {
  if (!window.Kakao.Auth) {
    console.error('Kakao SDK가 아직 초기화되지 않았습니다.');
    return;
  }

  const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY;
  const redirectUri = 'http://localhost:3000/kakao-redirect'; // 등록된 redirect URI

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${redirectUri}&response_type=code`;

  // ✅ 팝업 창으로 띄우기
  window.open(
    kakaoAuthUrl,
    'kakao-login',
    'width=500,height=600,top=100,left=100,resizable=no,scrollbars=yes'
  );
}