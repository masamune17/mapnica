import { createApp } from 'vue'
import { updateResult } from './search_word.js'
import SliderItems from './slider_items.vue'
export let map
const inputWord = document.getElementById('search-box')

window.onload = () => {
  initMap()
  searchButtonAction()
  const selector = '#slider-container'
  const appSearchResults = createApp(SliderItems)
  appSearchResults.mount(selector)
  inputWord.addEventListener('input', updateResult)
}

function initMap () {
  const mapOptions = {
    center: {
      lat: 41,
      lng: 12
    },
    zoom: 4,
    disableDefaultUI: true
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions) // eslint-disable-line
}

function searchButtonAction () {
  const searchItemElement = document.getElementById('search-items-container')
  document.getElementById('search-btn').addEventListener('click', function () {
    if (searchItemElement.classList.length === 1) {
      searchItemElement.classList.add('fadein-search-items')
    } else if (searchItemElement.classList.contains('fadeout-search-items')) {
      searchItemElement.classList.add('fadein-search-items')
      searchItemElement.classList.remove('fadeout-search-items')
    } else {
      searchItemElement.classList.add('fadeout-search-items')
      searchItemElement.classList.remove('fadein-search-items')
    }
  })
}
