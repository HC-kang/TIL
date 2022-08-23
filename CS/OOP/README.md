## OOP

### 0. SOLID
   1. Single Responsibility(단일 책임 원칙)
   2. Open Closed(개방 폐쇄 원칙)
   3. Liskov Substitution(리스코프 치환 원칙)
   4. Interface Segregation(인터페이스 분리 원칙)
   5. Dependency Inversion(의존성 역전 원칙)

### 1. Single Responsibility(단일 책임 원칙)

- 객체는 하나의 책임만 가져야 한다.
- 책임을 잘게 쪼개어 분할한다.

#### AS-IS

```python
class Employee:
    def coding(self):
        print('코딩')
    
    def design(self):
        print('디자인')
    
    def analyze(self):
        print('분석')
```

#### TO-BE

```python
class Developer:
    def coding(self):
        print('코딩')

class Designer:
    def design(self):
        print('디자인')

class Analyst:
    def analyze(self):
        print('분석')
```

### 2. Open Closed(개방 폐쇄 원칙)

- 객체의 확장에는 열려있다. -> 언제든 확장 할 수 있다.
  - 추상 클래스 상속을 통한 확장
- 수정에는 닫혀있다. -> 수정할 필요가 없다.
  - 기존 코드는 유지
- 요구사항이 바뀌었을 때, **변동될 부분**과 **변동되지 않을 부분**이 명확하게 구분되어있어야 한다.

#### AS-IS

```python
class Developer:
    def coding(self):
        print('코딩')

class Designer:
    def design(self):
        print('디자인')

class Analyst:
    def analyze(self):
        print('분석')

class Company:
    def __init__(self, employees):
        self.employees = employees
    
    # employ가 다양해질수록 코드를 계속 변경해야 함
    def make_work(self):
        for employee in self.employees:
            if type(employee) == Developer:
                employee.coding()
            elif type(employee) == Designer:
                employee.design()
            elif type(employee) == Analyst:
                employee.analyze()
```

#### TO-BE

```python
class Employee(ABC):
    @abstractmethod
    def word(self):
        ...

class Developer(Employee):
    def work(self):
        print('코딩')

class Designer(Employee):
    def work(self):
        print('디자인')

class Analyst(Employee):
    def work(self):
        print('분석')

class Manager(Employee):
    def work(self):
        print('매니징')

class Company:
    def __init__(self, employees: List[Employee]):
        self.employees = employees
    
    # employee가 늘어나도 변경에는 닫혀있다.
    def make_work(self):
        for employee in self.employees:
            employee.work()
```

### 3. Liskov Substitution(리스코프 치환 원칙)

- 부모 객체의 역할은 자식 객체도 할 수 있어야 한다. -> 말그대로, 정말로 바꿔 넣어도 이상이 없어야 한다.

#### Bad Example 1

```python
class Employee(ABC):
    @abstractmethod
    def work(self):
        ...


class Developer(Employee):
    def work(self):
        print('코딩')
        return ["if..", "for..."]


class FrontEndDeveloper(Developer):
    def work(self):
        print('프론트엔드 개발')
        # no return

if __name__ == "__main__":
    def make_code(developer: Developer):
        code = developer.work()
        print(f"총 {len(code)} 줄의 코드를 작성하였습니다.")
        
    make_code(Developer())
    make_code(FrontEndDeveloper())
```

#### Bad Example 2

- 개인적으로 아래 예시가 더 와닿았다.

```python
class Rectangle:
    def get_width(self):
        return self.width
    
    def get_height(self):
        return self.height
    
    def set_width(self, width):
        self.width = width
    
    def set_height(self, height):
        self.height = height


class Square(Rectangle):
    def set_width(self, width):
        self.width = width
        self.height = width
    
    def set_height(self, height):
        self.width = height
        self.height = height


if __name__ == "__main__":
    square = Square()
    square.set_width(20)
    square.set_height(30)

    check = square.get_width() == 20 and square.get_height() ==30
```

### 4. Interface Segregation(인터페이스 분리 원칙)

- 자신이 이용하지 않는 메서드는 의존하지 않아야 한다. -> 쓸데없는 것이 있으면 안된다.
- 리스코프 치환 원칙과 함께, 필요없을 수 있거나 변경될 수 있는 요소에 대한 상속이 위험하다는 것을 알 수 있음. 이러한 요소는 Composition을 이용하자.

#### AS-IS

```python
class SmartPhone(ABC):
    @abstractmethod
    def call(self):
        ...
    
    @abstractmethod
    def send_message(self):
        ...
        
    @abstractmethod
    def see_youtube(self):
        ...
    
    @abstractmethod
    def take_picture(self):
        ...

class PhoneWithoutCamera(SmartPhone):
    ... # take_picture()메소드는 쓸모없어졌다.
```

#### TO-BE

```python
class Telephone(ABC):
    @abstractmethod
    def call(self):
        pass
    
    @abstractmethod
    def send_message(self):
        pass
    

class Camera(ABC):
    @abstractmethod
    def take_picture(self):
        pass


class Application(ABC):
    @abstractmethod
    def see_youtube(self):
        pass


class PhoneWithoutCamera(Telephone, Application):
    pass
```

### 5. Dependency Inversion(의존성 역전 원칙)

- 의존성은 항상 고수준을 바라봐야 한다. -> 구체적인 대상에 의존하지 마라 -> (포괄적인)추상 클래스나 인터페이스에 의존하라

#### AS-IS

```python
class InMemoryDatabase:
    def __init__(self):
        pass
    
    def store_data(self, data):
        pass
    

class App():
    def __init__(self):
        self.inMemoryDB = InMemoryDatabase()
    
    def save_user(self, data):
        self.inMemoryDB.store_data(data)


if __name__ == "__main__":
    app = App()
    app.save_user({'id': 1, 'name': 'grab'})
```

#### TO-BE

1. 의존성 역전

    ```python
    class Database(ABC):
        def __init__(self):
            pass


    class InMemoryDatabase(Database):
        def __init__(self):
            pass
        
        def store_data(self, data):
            pass

    class App():
        def __init__(self):
            # 고수준을 의존하지만 구현체를 구현하는 코드가 함께 있어, 반쪽짜리 의존성 역전임.
            self.inMemoryDB: Database = InMemoryDatabase()
        
        def save_user(self, data):
            self.inMemoryDB.store_data(data)


    if __name__ == "__main__":
        app = App()
        app.save_user({'id': 1, 'name': 'grab'})
    ```

2. 의존성 주입

    ```python
    class App():
        def __init__(self, database: Database):
            self.database = database
        
        def save_user(self, data):
            self.database.store_data(data)


    if __name__ == "__main__":
        inMemoryDB = InMemoryDatabase()
        app = App(inMemoryDB)
        app.save_user({'id': 1, 'name': 'grab'})
    ```
