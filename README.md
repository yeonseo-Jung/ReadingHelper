# 독서 비서 웹 (Reading Helper)

## 주제 📝

채팅 봇 형식 독서 관리 웹 페이지

## Tech

- Frontend: React Hook, Redux, PostCSS
- Backend: Spring, MySQL, AWS EC2, MVC pattern

# Frontend

## Start

remove package-lock.json

```sh
yarn install
yarn start
```

## Structure

- 📁 frontend
  - 📁 common [페이지 내에서 공통으로 사용하는 이미지, 폰트, css 등]
  - 📁 components [페이지 내에서 사용될 컴포넌트]
  - 📁 pages [각 페이지의 View를 구성하는 폴더]
  - 📁 service [백엔드와의 통신과 관련된 폴더]
  - 📁 actions [Redux 상태 관리와 연관된 폴더]
  - 📁 reducers [Redux 상태 관리와 연관된 폴더]
  - 📄 package.json
  - 📄 app.jsx [해당 파일에서부터 링크별로 페이지가 Routing 됩니다.]

## 규칙

- 카멜 표기법 사용
- 코드는 본인 Repository에 push 한 후 Pull Request 올려서 팀원들에게 피드백 받기!
- Pull Request 제목 형식: [기능] 기능 설명
