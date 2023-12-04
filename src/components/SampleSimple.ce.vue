<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/useCounter';

const main = useCounterStore();
const { counter } = storeToRefs(main)
const { increment, decrement } = main
function reset() {
  main.$reset();
}
</script>

<template>
  <article>
    <div class="counter">
      <button type="button" class="increment" @click="increment()">Increment</button>
      <button type="button" class="decrement" @click="decrement()">Decrement</button>
      <button type="button" class="reset" @click="reset()">reset</button>
      <div class="result">Count: <strong class="count">{{ counter }}</strong></div>
    </div>
  </article>
</template>

<style>
/* css in shadow dom after build */
article {
  display: grid;
  height: 100vh;
  align-items: start;
  width: 100wh;
  justify-content: center;
  padding: 4rem;
  font-size: 24px;
}

.counter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  width: 4.5in;
}


.counter .result {
  grid-row: 1;
  grid-column: 1 / 3;
  text-align: center;
  margin-bottom: 1rem;
}
.counter button {
  grid-row: 2;
}
.counter .reset {
  grid-row: 3;
  grid-column: 1 / 3;
}


button {
  --shadow-color: #000;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px var(--shadow-color), 2px 2px 0px 0px var(--shadow-color), 3px 3px 0px 0px var(--shadow-color), 4px 4px 0px 0px var(--shadow-color), 5px 5px 0px 0px var(--shadow-color);
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}
</style>