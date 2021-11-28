import { createApp } from 'vue'
import SearchBox from './search_box.vue'

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#js-search-items-container'  
  const app = createApp(SearchBox)
  app.mount(selector)
})
