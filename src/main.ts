import { createApp } from 'vue'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/instrument-sans'
import './styles/main.css'
import App from './App.vue'
import { vReveal } from './directives/reveal'

createApp(App).directive('reveal', vReveal).mount('#app')
