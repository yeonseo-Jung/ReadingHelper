# Frontend

## Tech

React Hook, Material-UI, SCSS, MVC pattern

## Start

remove package-lock.json

```sh
npm install
npm start
```

## Structure

- 📁 frontend
  - 📁 components [페이지 내에서 사용될 컴포넌트 폴더]
  - 📁 pages [각 페이지의 View를 구성하는 폴더]
  - 📁 scss [컴포넌트, 페이지에 필요한 스타일 시트 폴더]
    - 📁 base
    - 📁 components
    - 📁 pages
    - 📄 main.scss (인덱스 파일)
  - 📄 package.json
  - 📄 App.js [해당 파일에서부터 링크별로 페이지가 Routing 됩니다.]
  - 📄 Root.js

## 규칙

- index.js (인덱스 파일): 각 폴더마다 이 파일에 인덱스를 지정해야 외부에서 import 할 수 있습니다.
- scss파일은 파일명 맨 앞에 언더바(\_)를 붙여줍니다.
- js파일에서 className=""을 활용해 scss에 접근합니다.
