import { createApp } from 'vue'
import { Marker, clickColor } from './marker.js'
import { map } from './main.js'
import { searchYear } from './search_year.js'
import SearchResults from './search_results.vue'
import * as SliderItems from './slider_items.vue'

let resultLabels, resultAbstructs

export function updateResult (input) {
  const resultsElement = '<div id="search-results" class="search-results"></div>'
  const keyword = input.target.value
  const minimumCharacterLimit = 2
  const searchResultElement = document.getElementById('search-results')
  if (searchResultElement !== null) {
    searchResultElement.remove()
  }
  if (minimumCharacterLimit <= keyword.length) {
    document.getElementById('search-items').insertAdjacentHTML('afterend', resultsElement)
    outputResult(keyword)
  }
}

async function outputResult (keyword) {
  resultLabels = []
  resultAbstructs = []
  const searcheWordApi = await searchKeyword(keyword)
  const selector = '#search-results'
  // eslint-disable-next-line vue/one-component-per-file
  const appSearchResults = createApp(SearchResults, {
    resultLabels: resultLabels,
    resultAbstructs: resultAbstructs,
    keyword: keyword
  })
  for (let i = 0; i < searcheWordApi.length; i++) {
    const labelSearch = searcheWordApi[i].label.toLowerCase().indexOf(keyword)
    if (labelSearch !== -1) {
      resultLabels.push(searcheWordApi[i])
    }
  }
  for (let i = 0; i < searcheWordApi.length; i++) {
    const labelSearch = searcheWordApi[i].label.toLowerCase().indexOf(keyword)
    if (labelSearch === -1) {
      const abstractSearch = searcheWordApi[i].abstract.toLowerCase().indexOf(keyword)
      if (abstractSearch !== -1) {
        resultAbstructs.push(searcheWordApi[i])
      }
    }
  }
  appSearchResults.mount(selector)
  if (resultLabels.length !== 0) {
    for (let i = 0; i < resultLabels.length; i++) {
      clickResult(resultLabels, i)
    }
  }
  if (resultAbstructs.length !== 0) {
    for (let i = 0; i < resultAbstructs.length; i++) {
      clickResult(resultAbstructs, i)
    }
  }
}

function clickResult (array, arrayNum) {
  const searchResults = array
  const idNum = searchResults[arrayNum].id  
  document.getElementById(`search-result${idNum}`).addEventListener('click', async function () {
    const resultYear = Math.floor(Number(searchResults[arrayNum].accrual_date.slice(0, -6)) / 100) * 100
    SliderItems.default.methods.clickResultYear(resultYear)
    Marker.showMarker(resultYear)
    Marker.showMarkerInfo(searchResults[arrayNum])
    const searcheEraAPI = await searchYear(resultYear)
    let makerNum
    for (let i = 0; i < searcheEraAPI.length; i++) {
      if (searcheEraAPI[i].id === searchResults[arrayNum].id) {
        makerNum = i
      }
    }
    Marker.changeColor(makerNum, clickColor)
    map.panTo(new google.maps.LatLng(searchResults[arrayNum].latitude, searchResults[arrayNum].longitude)) // eslint-disable-line
  }, false)
}

function searchKeyword (keyword) {
  const url = '/api/maps/searche_word'
  const data = { keyword: keyword }
  const queryParams = new URLSearchParams(data)
  return fetch(`${url}?` + queryParams) // eslint-disable-line
    .then(response => response.json())
}
