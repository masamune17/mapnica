import { Marker } from './marker.js'
import { updateResult } from './search_word.js'
export let map

const inputWord = document.getElementById('search-box')
let inputYear = document.getElementById('year')
let currentValueElem = document.getElementById('current-value')

export const setSlider = () => {
  inputYear = document.getElementById('year')
  currentValueElem = document.getElementById('current-value')
  inputYear.addEventListener('input', rangeOnChange)
}

window.onload = () => {
  initMap()
  searchButtonAction()
  setCurrentValue(inputYear.value)
  inputYear.addEventListener('input', rangeOnChange)
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

function setCurrentValue (val) {
  currentValueElem.innerText = val
  const era = Number(val)
  Marker.showMarker(era)
}

function rangeOnChange (year) {
  setCurrentValue(year.target.value)
}
