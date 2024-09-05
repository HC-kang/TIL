# DOM 노드의 종류와 `nodeType`

HTML 문서에서 각 노드는 특정한 유형으로 분류됩니다. DOM(Document Object Model)에서는 다양한 유형의 노드를 사용하여 HTML 문서의 구조를 표현하며, 각 노드는 nodeType 속성을 통해 그 유형을 나타냅니다. 주요 엘리먼트 노드 유형은 다음과 같습니다:

## 1. Element 노드 (nodeType === 1)

- 설명: HTML 요소를 나타내는 노드입니다. `<div>`, `<p>`, `<span>`, `<a>` 등의 태그들이 모두 요소 노드로 분류됩니다.
- 특징: 요소 노드는 속성(attributes)과 자식 노드를 가질 수 있으며, DOM 트리의 중요한 구조적 요소입니다.
- 예시:

    ```html
    <div>Content</div>
    ```

여기서 <div>는 요소 노드입니다.

## 2. Attribute 노드 (nodeType === 2) (거의 사용되지 않음)

- 설명: 요소의 속성을 나타내는 노드입니다. 그러나 최신 DOM API에서는 직접적으로 다루지 않고, `Element` 객체의 속성을 통해 접근합니다.
- 특징: 대부분의 경우 `getAttribute`, `setAttribute` 메서드나 `attributes` 속성을 통해 속성을 다룹니다.
- 예시:

    ```html
    <a href="https://example.com">Link</a>
    ```

여기서 href는 `<a>` 요소의 속성입니다.

## 3. Text 노드 (nodeType === 3)

- 설명: 요소나 속성의 텍스트 내용을 나타내는 노드입니다. 텍스트 노드는 순수한 텍스트 데이터를 포함하며, 자식 노드를 가질 수 없습니다.
- 특징: 텍스트 노드는 일반적으로 요소 노드의 자식으로 존재하며, 해당 요소의 텍스트 내용을 표현합니다.
- 예시:

    ```html
    <p>Hello, World!</p>
    ```

여기서 `"Hello, World!"`는 <p> 요소의 자식 텍스트 노드입니다.

## 4. Comment 노드 (nodeType === 8)

- 설명: HTML 주석을 나타내는 노드입니다. <!-- comment --> 형식으로 표시되는 모든 주석이 주석 노드로 취급됩니다.
- 특징: 주석 노드는 렌더링되지 않으며, 개발자가 코드에 주석을 추가하는 데 사용됩니다.
- 예시:

    ```html
    <!-- This is a comment -->
    ```

여기서 <!-- This is a comment -->는 주석 노드입니다.

## 5. Document 노드 (nodeType === 9)

- 설명: 문서 자체를 나타내는 루트 노드입니다. DOM 트리의 최상위에 위치하며, 모든 노드의 부모 역할을 합니다.
- 특징: document 객체는 DOM의 진입점이며, HTML 문서의 최상위 요소를 나타냅니다.
- 예시:

    ```javascript
    const doc = document;
    ```

여기서 document는 문서 노드를 참조합니다.

## 6. DocumentType 노드 (nodeType === 10)

- 설명: 문서 유형을 나타내는 노드입니다. <!DOCTYPE html> 선언으로 문서의 형식을 지정합니다.
- 특징: 문서 유형 선언 노드는 HTML 문서가 표준 모드에서 렌더링되도록 브라우저에 지시합니다.
- 예시:

    ```html
    <!DOCTYPE html>
    ```

여기서 <!DOCTYPE html>는 문서 유형 노드입니다.

## 7. DocumentFragment 노드 (nodeType === 11)

- 설명: 문서 조각을 나타내는 노드입니다. 문서의 특정 부분을 저장하고 조작하기 위한 임시 컨테이너로 사용됩니다.
- 특징: DocumentFragment는 메모리에서만 존재하며, DOM에 직접 추가되지 않으므로 성능 최적화에 유리합니다.
- 예시:

    ```javascript
    const fragment = document.createDocumentFragment();
    ```

여기서 fragment는 빈 DocumentFragment 객체입니다.

## 8. ProcessingInstruction 노드 (nodeType === 7)

- 설명: XML 문서에서 프로세서에게 특정 명령을 전달하기 위해 사용되는 노드입니다. HTML에서는 거의 사용되지 않습니다.
- 특징: XML 문서에서만 사용되며, HTML에서는 사용되지 않습니다.
- 이와 같이, DOM 노드는 여러 가지 유형으로 구분되며, 각각의 nodeType 속성을 통해 노드의 종류를 구분할 수 있습니다. 각 노드는 HTML 문서의 구조를 반영하며, DOM API를 사용하여 프로그래밍적으로 접근하고 조작할 수 있습니다.
