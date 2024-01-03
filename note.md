### HTTP Method
  - get: get
  - post: new, login
  - put: modify, update (멱등성이 있음)
  - patch:              (멱등성이 없음)
  - delete: delete

  * 멱등성: 동일한 요청을 한번 보내는 것과 여러번 보내는 것의 결과가 같은 것 (입력이 같을 때 출력이 같은 것)

Json의 단점
크기가 커서 트래픽 증가
-> protobuff를 사용해 압축