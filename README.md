# 🌐 React Web Project

![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3)
![Node.js](https://img.shields.io/badge/Node.js-18.16.0-green?style=flat&logo=node.js)

> React, JavaScript, HTML, CSS를 활용하여 웹 애플리케이션을 개발하는 프로젝트입니다.

---

## 🚀 프로젝트 개요

- React와 JavaScript를 기반으로 한 **웹 애플리케이션 개발**  
- 최신 **ES6+ 문법**을 활용하여 코드 작성  
- **컴포넌트 기반 개발**을 통한 유지보수성 향상  
- **CSS3 & Styled-Components** 또는 TailwindCSS 활용하여 스타일링  
- API 연동을 통한 데이터 처리 및 동적 렌더링 
- Material-UI를 활용하여 풍부하고 일관된 사용자 경험(UX)을 제공합니다.

---

## 📌 사용 기술 (Tech Stack)

| 기술 스택              | 설명 |
|-----------------------|--------------------------|
| **React**            | UI 컴포넌트 기반의 JavaScript 라이브러리 |
| **JavaScript (ES6+)** | 최신 JS 문법 활용 (async/await, destructuring, spread 연산자 등) |
| **HTML5**            | 웹 페이지 구조화 및 시맨틱 태그 사용 |
| **CSS3**             | Flexbox/Grid 활용한 반응형 디자인 |
| **Styled-Components**| 컴포넌트 기반 CSS-in-JS 스타일링 |
| **Node.js**          | 프로젝트 빌드 및 서버 실행 |
| **Vite/Webpack**     | 빠른 번들링 및 최적화 |
| **Redux**            | 전역 상태(state) 관리 라이브러리 |

---

## 📂 프로젝트 구조 (Project Structure)

```                                                                                                                                     
src/
├── App.css                  # 전체 App 스타일
├── App.js                   # 메인 컴포넌트
├── App.test.js              # 기본 테스트 파일
├── index.css                # 전역 CSS 스타일
├── index.js                 # React 렌더링 엔트리 포인트
├── logo.svg                 # 기본 로고
├── reportWebVitals.js       # 성능 측정 유틸리티
├── server.js                # 로컬 서버 구성
├── setupTests.js            # 테스트 설정
├── store.js                 # Redux 중앙 스토어 설정
├── features/                # Redux Toolkit 슬라이스 정의
│   └── auth/
│       └── authSlice.js     # 인증 상태 및 액션 정의
├── pages/                   # 주요 페이지 및 컴포넌트
│   ├── Blog/
│   │   └── Blog.js          # 블로그/게시판 페이지
│   ├── components/          # 공통 UI 컴포넌트
│   │   ├── AppAppBar.js
│   │   ├── CustomIcons.js
│   │   ├── Footer.js
│   │   ├── ForgotPassword.js
│   │   ├── Latest.js
│   │   ├── MainContent.js
│   │   └── SitemarkIcon.js
│   ├── MyPage/
│   │   └── MyPage.js        # 마이페이지
│   ├── redirect/            # 소셜 로그인 리다이렉트
│   │   ├── googleRedirect.js
│   │   └── kakaoRedirect.js
│   ├── shared-theme/        # 테마 및 스타일 관련
│   │   ├── customizations/  # MUI 컴포넌트 커스터마이징
│   │   │   ├── dataDisplay.js
│   │   │   ├── feedback.js
│   │   │   ├── inputs.js
│   │   │   ├── navigation.js
│   │   │   └── surfaces.js
│   │   ├── AppTheme.js
│   │   ├── ColorModeIconDropdown.js
│   │   ├── ColorModeSelect.js
│   │   └── themePrimitives.js
│   ├── sign-in/
│   │   └── SignIn.js        # 로그인 페이지
│   ├── sign-up/
│   │   └── SignUp.js        # 회원가입 페이지
│   └── google-redirect.js   # 루트 레벨 Google OAuth 리다이렉트
└── util/                    # 유틸리티 함수 모음
    ├── googleAuth.js        # Google 인증 유틸
    └── kakaoAuth.js         # Kakao 인증 유틸
```

## 📜 주요 기능 (Features)
✅ Redux 및 Redux Toolkit을 통한 전역 상태 관리  
✅ React Router를 활용한 페이지 이동  
✅ API 연동을 통한 동적 데이터 렌더링 (Fetch/Axios)  
✅ 반응형 디자인 구현 (Flexbox/Grid, CSS Media Queries)  
✅ 다크모드 지원 (Styled-Components 활용) 

---

## 🎨 실행 방법 (Getting Started)

1️⃣ 프로젝트 클론 후 폴더로 이동  
```sh
git clone https://github.com/your-repo/react-web-project.git
cd react-web-project
