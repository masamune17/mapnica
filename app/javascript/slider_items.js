import { createApp } from 'vue'
import SliderItems from './slider_items.vue'

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#js-slider-container'
  const app = createApp(SliderItems)
  app.mount(selector)
})
