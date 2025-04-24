const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/**
 * Google 로그인/회원가입 공통 함수
 * @param {'login' | 'signup'} mode - 로그인 또는 회원가입 모드
 */
export function GoogleAuth(mode = 'login') {
  if (!['login', 'signup'].includes(mode)) {
    console.error('mode는 "login" 또는 "signup"이어야 합니다.');
    return;
  }

  const redirectUri = `http://localhost:3000/google-redirect?mode=${mode}`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${googleClientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile` +
    `&access_type=offline` +
    `&prompt=consent`;

  window.open(
    googleAuthUrl,
    `google-${mode}`,
    'width=500,height=600,top=100,left=100,resizable=no,scrollbars=yes'
  );
}
