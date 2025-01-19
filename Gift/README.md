# Gift

생일 선물 펀딩 Web3 플랫폼
🚀 프로젝트 시작하기

1. 레포지토리 클론
   git clone https://github.com/KOBAC-GiftFunding/Gift.git
   cd Gift
2. 패키지 설치
   각 폴더에서 패키지를 설치해주세요:

# 프론트엔드 패키지 설치

cd front
npm install

# 백엔드 패키지 설치

cd ../back
npm install

# 스마트 컨트랙트 패키지 설치

cd ../contracts
npm install
🌳 브랜치 전략

1. 브랜치 구조
   Copymaster (프로덕션)
   └── develop (개발 통합)
   └── feat/${본인 이름} (개인 작업 브랜치)
2. 작업 시작하기

# 1. develop 브랜치 체크아웃

git checkout develop

# 2. 본인 브랜치 생성 (최초 1회)

git checkout -b feat/본인이름
git push --set-upstream origin feat/본인이름

🔄 PR 프로세스

본인 브랜치에서 작업 완료 후 PR 생성
base 브랜치를 develop으로 설정
코드 리뷰 후 develop에 merge

예시:

base: develop ← compare: feat/sungwoo

커밋 메시지 예시
git commit -m "Feat: 월렛 연동 기능 구현"
git commit -m "Fix: 로그인 오류 수정"

📁 프로젝트 구조
CopyGift/
├── front/ # React + TypeScript
├── back/ # Express + TypeScript
└── contracts/ # Hardhat 프로젝트
⚠️ 작업 시 주의사항

작업 시작 전 항상 develop 브랜치 pull 하기

git checkout develop
git pull origin develop

브랜치 이름 규칙 준수하기
커밋 메시지 규칙 준수하기
PR 생성 시 상세한 설명 작성하기

👥 작업 분담
프론트엔드

양성우
권소희

백엔드

김성진
박유진
