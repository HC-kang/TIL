# JS Performance

## 목차

## 소개

자바스크립트 성능을 향상시키기 위한 방법들을 정리한다.

## 내용

### 0. 각 Loop별 성능

- 직접 측정

    - 
    
    | Idx | Loop Type    | Average Time (ms) | Average Memory (MB) |
    | --- | ------------ | ----------------- | ------------------- |
    |   1 | While loop   | 11.842            | 0.009               |
    |   2 | For loop     | 12.384            | 0.008               |
    |   3 | ForEach loop | 15.960            | 0.005               |
    |   4 | Reduce loop  | 15.543            | 0.006               |
    |   5 | Filter loop  | 16.725            | 0.104               |
    |   6 | For of loop  | 18.546            | 6.698               |
    |   7 | Map loop     | 25.209            | 7.636               |
    |   8 | For in loop  | 78.580            | 30.527              |

- Benchmark.js

    | Idx | Loop Type    | Time (ms) | Memory (MB) | Performance (ops/sec) ±% | Runs Sampled |
    | --- |--------------|------------|-------------|-------------------------|--------------|
    |   1 | While loop   | 19.226     | 0.000       | 2.26 ±4.10%             | 10           |
    |   2 | For loop     | 26.809     | 0.000       | 2.30 ±1.26%             | 10           |
    |   3 | Reduce loop  | 83.867     | 0.000       | 1.97 ±1.59%             | 9            |
    |   4 | For of loop  | 85.277     | 0.000       | 2.00 ±1.86%             | 9            |
    |   5 | ForEach loop | 93.922     | 0.000       | 1.90 ±2.44%             | 9            |
    |   6 | Filter loop  | 148.784    | 0.000       | 1.76 ±2.38%             | 9            |
    |   7 | Map loop     | 200.299    | 0.000       | 1.58 ±2.50%             | 8            |
    |   8 | For in loop  | 1344.171   | 0.000       | 0.62 ±3.18%             | 6            |


### 1. 문자열 비교

### 2. Object의 형태

### 3. Array 메소드 vs for loop

### 4. Object 접근

### 5. 캐시 미스

### 6. 큰 Object

### 7. 문자열 변조

### 8. 케이스 처리의 우선순ㄴ위

### 9. 적절한 데이터 구조

## 참고

- https://www.youtube.com/watch?v=koky8mDdtAk
