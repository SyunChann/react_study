const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/**
 * Google 로그인/회원가입 공통 함수
 */
export function GoogleAuth() {
  const redirectUri = `http://localhost:3000/google-redirect`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${googleClientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile` +
    `&access_type=offline` +
    `&prompt=consent`;

  window.open(
    googleAuthUrl,
    `google`,
    'width=500,height=600,top=100,left=100,resizable=no,scrollbars=yes'
  );
}
