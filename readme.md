## 실시간 문서 편집 프로토타입

## TODO
- [ ] 둘이 동시에 편집할 때 conflict 확인
- [ ] undo/redo 처리
- [ ] 드래그 선택 후 한번에 삭제 혹은 입력 시 처리

undo/redo, 드래그 생각하는 해결 방법
- historyUndo 이벤트를 받으면 다른 클라이언트들의 textarea에 historyUndo 이벤트 트리거
  - 어떻게 하는건지 모르겠음

- 둘 다 해결하는 방법
  - 이벤트 전, 후 텍스트 비교

- hackmd는 어떻게 처리하지?
- operation 객체
  - index
  - data(인풋값)
  - ranges { anchor, head }

예) 42["operation", 35, [6600, "c"], {ranges: [{anchor: 6601, head: 6601}]}]

- 삭제인 경우 data를 음수로 처리
  예)  
  - 맨 앞에서 3개 삭제
    - 42["operation", 51, [-3, 6598], {ranges: [{anchor: 0, head: 0}]}]
  - 맨 뒤에서 4개 삭제
    - 42["operation", 61, [6598, -4], {ranges: [{anchor: 6598, head: 6598}]}]

- undo/redo
  - 데이터가 이전과 어떻게 달라졌는지?
    - undo로 7개 데이터가 지워졌을 때
      - 42["operation", 69, [6598, -7], {ranges: [{anchor: 6598, head: 6598}]}]
    - redo로 7개 데이터가 다시 생겼을 때
      - 42["operation", 91, [6598, "1234567"], {ranges: [{anchor: 6605, head: 6605}]}]

