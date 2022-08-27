## TDD

### 기본 개념

- 유닛 테스트
  - 가장 작은 단위의 테스트.
  - 코드의 함수, 클래스의 메서드가 잘 작동하는지 확인.
  - 다른 외부 컴포넌트에 의존성이 없어야 함.
  - 가장 간단하고, 직관적이고, 빠르게 실행할 수 있는 테스트.
- 통합 테스트(Integration Test)
  - 여러 요소를 통합한 테스트.
  - DB와 연동한 코드가 잘 작동하는지, 여러 함수와 클래스가 통합된 로직이 잘 작동하는지 확인.
  - 유닛테스트보다 복잡하고, 느리지만, 구조체 단위의 테스트라는 점에서 중요함.
- E2E테스트
  - End to End Test.
  - 클라이언트 입장에서 소프트웨어 전체의 기능을 테스트하는 것.
  - 유저 시나리오에 따라 테스트 실시
  - 최종 사용자인 유저의 입장에서 테스트. 본질적으로 가장 중요함.

## 테스트 더블

- 테스트 더블의 종류
  - Dummy
    - 실제 동작은 구현하지 않은 채, 객체의 인터페이스만 구현한 테스트 더블 객체.
    - 메서드가 동작하지 않아도 문제가 없을 시에 사용.

    ```python
    class DummyRepository(Repository):
        def insert(self, data):
            return True
        
        def find_by_id(self, user_id):
            return "ford"
    ```

  - Stub
    - 더미 테스트 객체에서 테스트에 필요한 최소한의 구현만 해 둔 객체.
    - 테스트에서 호출될 요청에 대해 미리 준비해둔 결과만 반환.

    ```python

    ```

  - Spy
    - stub에 테스트에 필요한 정보를 기록하는 기능을 추가한 객체
    - 보통 stub의 역할을 포함함.
    - 실제로 내부가 잘 작동했는지 등을 별도 인스턴스 변수로 기록함.

    ```python
    class SpyUserRepository(Repository):
      insert_called = 0

      def insert(self, data):
          SpyUserRepository.insert_called += 1
          return "OK"
      
      @property
      def get_insert_called(self):
          return SpyUserRepository.insert_called
    ```

  - Fake
    - 동작의 구현은 갖추고있지만, 테스트에서만 활용 할 수 있는 객체.
    - 대체할 객체가 복잡한 내부 로직이나 외부 의존성이 있을때 사용

    ```python
    class FakeUserRepository(Repository):
        def __init__(self):
            self.users = []
        
        def insert(self, data):
            self.users.append(data)
        
        def find_by_id(self, user_id):
            return [user for user in self.users if user.id == user_id]
    ```

  - Mock
    - 테스트에 필요한 인터페이스와 반환 값을 제공해주는 객체
    - 해당 메서드가 제대로 호출되었는지 확인하는 행위검증의 기능을 가짐.
    - 다른 테스트더블과 다르게 보통 객체를 직접 정의하지 않고, 보통 Mock 객체로 반환값을 미리 정해둠.
      - 대부분의 테스트 프레임워크는 Mocking을 정밀하게 할 수 있도록 지원 해 줌.

    ```python
    @mock.patch.object(UserRepository, 'insert')
    def test(insert_method):
        insert_method.return_value = "OK" # stub처럼 기댓값을 반환
        insert_method({"id": 1, "name": "ford"})
        insert_method.assert_called_once() # 해당 메서드가 호출되었는지 확인(행위검증)
    
    # 서드파티 라이브러리에 mocking하는 사례
    @mock.patch("request.get")
    def test_get_user(mock_get):
      response = mock_get.return_value # 해당 mock 객체를 받아서 자유롭게 mocking
      response.status_code = 200
      response.json.return_value = {
        "name": "Test User",
        "email": "user@test.com"
      }
      user = get_user(1)

      assert user["name"] == "Test User"
      # 해당 메서드와 인자가 제대로 불렸는지 행위를 검증합니다.
      mock_get.assert_called_once_with("https://api-server.com/users/1")
    ```

### TDD 경험 정리

1. 모든 분기를 확인하되, 모든 값을 확인 할 수는 없다.
   1. 그렇기 때문에 랜덤을 잘, 적당하게 활용하자
2. 파일 생성 및 삭제 등, 다른 테스트에 영향을 주거나 반복 테스트에 영향을 줄 수 있는 부분을 미리 체크하자
   1. 테스트 코드 초입에는 항상 이전 테스트에서 잔류했을지 모를 파일 등 제거
   2. 테스트 코드 말미에는 항상 현재 테스트에서 발생한 파일 등 제거
