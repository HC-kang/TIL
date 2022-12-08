# Vue.js

## 주요 개념

- v-on
- v-bind
- v-model
- v-for
- v-if
- props
- provide/inject
- methods
- data
- computed
- watch
- component
- transition
- fall-through
  - 버튼 등을 컴포넌트로 활용할 때, 굳이 루트까지 이벤트를 전달할 필요 없이, 뷰에서 자동으로 이벤트를 전달해주는 기능
- slot
- vuex

## 소소한 팁

- component + provide/inject 조합
  - component 활용 시 무엇이 들어올지 모르므로, props 사용에 어려움이 있음
  - provide로 뚫고 내리면 props를 사용하지 않고도 component를 활용할 수 있음

- 한글 v-model 적용 시 문제점 처리를 위한 v-on:input + v-bind:value 조합

```vue
<!-- BaseInput.vue - 싱글 파일 컴포넌트 구조-->
<template>
  <input v-bind:value="value" v-on:input="updateInput">
</template>

<script>
export default {
  props: ['value'],
  methods: {
    updateInput: function(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>
```

```vue
<!-- App.vue - 싱글 파일 컴포넌트 구조 -->
<template>
  <div>
    <base-input v-model="inputText"></base-input>
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue';

export default {
  components: {
    'base-input': BaseInput
  },
  data: function() {
    return {
      inputText: ''
    }
  }
}
</script>
```
