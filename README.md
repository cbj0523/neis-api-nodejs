# neis-api-nodejs

> 현재 미완성입니다. 급식을 불러오는 기능을 제작중입니다.
정규식 구현에 매우 약해서 노가다 코드가 조금 많습니다. 더 좋은 알고리즘이 있다면 Issues 란에 달아주세요!
완성 후에는 npm/yarn 에 배포할 예정입니다. 추후 공지하겠습니다.

파일 설명

School.js -> 학교 코드를 불러오는 함수
utils.js -> 인자값에 따라 교육청 코드 리턴하는 함수(getEducation)
            replaceAll 정규식
            불러온 html을 깨끗하게 정리해주는 함수(htmlCleaner)
Menu.js -> 월 단위로 급식 불러오는 함수(getMonthlyMenu)
           일 단위로 급식 불러오는 함수(getDayMenu)
