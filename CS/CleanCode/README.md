## CleanCode

1. 결합도와 응집도
   1. 결합도(Coupling)
      - 높은 결합도

        ```python
        class Developer:
            name = 'dev'
            def drink_coffee(self):
                print('drink coffee')
                
            def turn_on_computer(self):
                print('turn on computer')
                
            def open_ide(self):
                print('open_ide')


        class Company:
            def make_work(self):
                developer = Developer()
                print(f"{developer.name}가 일을 시작합니다.")
                developer.drink_coffee()
                developer.turn_on_computer()
                developer.open_ide();
        ```

      - 낮은 결합도

        ```python
        class Developer:
            name = 'dev'
            
            def develop(self):
                self.drink_coffee()
                self.turn_on_computer()
                self.open_ide()
            
            def drink_coffee(self):
                print('drink coffee')
                
            def turn_on_computer(self):
                print('turn on computer')
                
            def open_ide(self):
                print('open_ide')


        class Company:
            def make_work(self):
                developer = Developer()
                developer.develop()
        ```

   2. 응집도(Cohesion)
      - 낮은 응집도

        ```python
        class LowCohesion:
            def __init__(self):
                self.a = 'a'
                self.b = 'b'
                self.c = 'c'
                
            def process_a(self):
                print(self.a)
                
            def process_b(self):
                print(self.b)
                
            def process_c(self):
                print(self.c)
        ```

      - 높은 응집도

        ```python
        class HighCohesion:
            def __init__(self):
                self.abc = 'abc'
            
            def process_a(self):
                self.abc.process_a
            
            def process_b(self):
                self.abc.process_b
            
            def process_c(self):
                self.abc.process_c
        ```
