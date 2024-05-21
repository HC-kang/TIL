# Wireshark 사용법

## 알아야 할 개념

- layout
  - `Wireshark` -> `Preferences` -> `Appearance` -> `Layouts`
  - 각 창의 위치 및 크기를 조정할 수 있다.
- Columns
  - `Wireshark` -> `Preferences` -> `Appearance` -> `Columns`
  - 각 패킷의 정보를 선택하여 보여 줄 수 있다.
  - 자유롭게 추가 및 삭제가 가능하다.
- profile
  - `Edit` -> `Configuration Profiles` -> `New`
- capture filter
  - `Capture` -> `Options` -> `Capture Filter`
  - promiscuous 모드는 항상 켜놓는 것이 좋다.
  - output 탭에서 파일로 저장할 수 있다.
    - 필요시 용량 제한 및 롤링도 가능하다.
- display filter
  - 대부분 apply as filter를 사용 가능하다.
  - ==, !=, >, <, >=, <=, &&, ||, !, contains, matches, in, is, is not, is present, is not present
    - `frame contains "HTTP"`
    - `dns matches "google"`
- Analyze
    - conversation filter
      - 현재 캡처된 패킷에 포함되는 대화를 요약해서 보여준다.
    - endpoint filter
      - 현재 캡처된 패킷에 포함되는 엔드포인트를 요약해서 보여준다.
    - follow
      - 각 스트림을 따라가는 기능

## CLI 사용법

- dumpcap
  - `dumpcap -D` : 사용 가능한 인터페이스 확인
  - `dumpcap -i 1 -w test.pcap` : 인터페이스 1번을 통해 패킷을 저장
  - `dumpcap -i 1 -w test.pcapng -b filesize:500000 -b files:100
