# var, let, const

## 변수 선언 방식

- `var`은 변수 선언 방식에 있어서 큰 단점을 가지고 있음.

```javascript
var name = "nams";
console.log(name); // nams

var name = "tae";
console.log(name); // tae
```

- 변수를 한 번 더 선엄했음에도 불구하고, 에러가 존재하지 않음
- 유연한 변수 선언으로 간단한 테스트에는 편리하지만 코드량이 많아지면....

> ES6 이후, 이를 보완하기 위해 추가 된 변수 선언 방식이 let과 const

```javascript
let name = "nams";
console.log(name); //nams

let name = "tae";
console.log(name);
//Uncaught SyntaxError: Identifier 'name' has already been declared
```

- `name`이 이미 선언되었다는 에러 메시지 발생(`const`도 같음)
- 즉, 변수 재선언이 안된다.

---

## let과 const의 차이는?

- 차이점은 `immutable` 여부
- `let`은 변수에 재할당이 가능

```javascript
let name = "nams";
console.log(name); // nams

let name = "tae";
console.log(name);
// Uncaught SyntaxError: Identifier 'name' has already been declared

name = "woo";
console.log(name); //woo
```

- `const`는 변수 재선언, 변수 재할당 모두 불가능

```javascript
const name = "nams";
console.log(name); // nams

const name = "tae";
console.log(name);
// Uncaught SyntaxError: Identifier 'name' has already been declared

name = "woo";
console.log(name);
//Uncaught TypeError: Assignment to constant variable.
```

---

## 호이스팅

- `Hoisting`이란, var 선언문이나 function 선언문 등을 해당 스코프의 선두로 옮긴 것처럼 동작하는 특성

- JavaScript는 ES6에서 도입된 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅 함

- `var`로 선언된 변수와는 달리 `let`로 선언된 변수를 선언문 이전에 참조하면 참조에러가 발생

```javascript
console.log(name); // undefined
var name;

console.log(name2);
// Error: Uncaught ReferenceError: bar is not defined
let name2;
```

- `let`로 선언된 변수는 스코프의 시작에서 변수의 선언까지 일시적 사각지대에 빠지기 때문

- 변수는 `선언단계`-`초기화단계`-`할당단계`에 걸쳐 생성
- `var`로 선언된 변수는 선언단계와 초기화 단계가 한번에 이루어짐
- `let`로 선언된 변수는 선언단계와 초기화 단계가 분리되어 진행

```
변수선언은 기본적으로 const
재할당이 필요한 경우에 한정해 let이용
```
