const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const redirectUri = 'http://localhost:3000/google-redirect';

export function googleLoginPopup() {
  const scope = 'profile email';
  const responseType = 'code';
  const includeGrantedScopes = 'true';

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&include_granted_scopes=${includeGrantedScopes}`;

  const popup = window.open(
    googleAuthUrl,
    'google-login',
    'width=500,height=600,top=100,left=100,resizable=no,scrollbars=yes'
  );

  const timer = setInterval(() => {
    if (!popup || popup.closed) {
      clearInterval(timer);
      return;
    }

    try {
      const url = popup.location.href;
      if (url.includes("code=")) {
        const code = new URL(url).searchParams.get("code");
        popup.close();
        clearInterval(timer);

        console.log("Google 인가코드:", code);
        // 서버에 보내서 토큰 Req → 정상 로그인 처리
      }
    } catch (e) {}
  }, 500);
}
