import SampleSimpleComponent from './components/SampleSimple.ce.vue'
import { createPinia } from 'pinia'
import main from "./assets/main.css";

import { vueDefineCustomElement } from './shared/createCustomElement';
const pinia = createPinia()

const plugins = [pinia]
const app = vueDefineCustomElement(SampleSimpleComponent, {plugins})
customElements.define("simple-sample", app)