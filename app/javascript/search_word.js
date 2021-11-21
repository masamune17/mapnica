import { createApp } from 'vue'
import { Marker, clickColor } from './marker.js'
import { map, setSlider } from './main.js'
import { searchYear } from './search_year.js'
import searchResults from './search_results.vue'

let resultlabels, resultAbstructs

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
  resultlabels = []
  resultAbstructs = []
  const searcheWordApi = await searchKeyword(keyword)
  const selector = '#search-results'
  const appSearchResults = createApp(searchResults, {
    resultlabels: resultlabels,
    resultAbstructs: resultAbstructs,
    keyword: keyword
  })
  for (let i = 0; i < searcheWordApi.length; i++) {
    const labelSearch = searcheWordApi[i].label.toLowerCase().indexOf(keyword)
    if (labelSearch !== -1) {
      resultlabels.push(searcheWordApi[i])
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
  if (resultlabels.length !== 0) {
    for (let i = 0; i < resultlabels.length; i++) {
      clickResult(resultlabels, i)
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
    const resultSlidesr = `<p class="year"><span id="current-value">${resultYear}</span> Year</p>` +
    `<input type="range" id="year" min="-400" max="2000" step="100" value="${resultYear}">`
    document.getElementById('slider-container').innerHTML = resultSlidesr
    setSlider()
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
