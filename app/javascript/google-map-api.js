const originColor = 'red'
const clickColor = 'blue'
const markers = []
const input = document.getElementById('search-box')
const wordValue = 100
const mapOptions = {
  center: {
    lat: 41,
    lng: 12
  },
  zoom: 4,
  disableDefaultUI: true
}
let markerData, searchResults

let map, selectedMarker
let inputElem = document.getElementById('era')
let currentValueElem = document.getElementById('current-value')

input.addEventListener('input', updateResult)

const setCurrentValue = (val) => {
  currentValueElem.innerText = val
  const era = Number(val)
  showMarker(era)
}

const rangeOnChange = (e) => {
  setCurrentValue(e.target.value)
}

inputElem.addEventListener('input', rangeOnChange)

function initMap () {
  map = new google.maps.Map(document.getElementById('map'), mapOptions) // eslint-disable-line
}

async function showMarker (era) {
  const searcheEraAPI = await searchEra(era)
  markerData = searcheEraAPI
  if (markers !== []) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
  }
  for (let i = 0; i < markerData.length; i++) {
    const markerLatLng = new google.maps.LatLng({ // eslint-disable-line
      lat: markerData[i].latitude,
      lng: markerData[i].longitude
    })

    markers[i] = new google.maps.Marker({ // eslint-disable-line
      position: markerLatLng,
      map: map,
      icon: pinSymbol(originColor)
    })
    markerEvent(i)
  }
}

function markerEvent (i) {
  markers[i].addListener('click', function () {
    showMarkerInfo(markerData[i])
    changeColor(i, clickColor)
  })
}

function showMarkerInfo (historyData) {
  const explainElement = document.getElementById('main-explain-item-container')
  if (explainElement.classList.contains('fadeout-explain')) {
    explainElement.classList.remove('fadeout-explain')
  }
  explainElement.classList.add('fadein-explain')
  document.getElementById('accrual_date').innerHTML = historyData.accrual_date
  document.getElementById('label').innerHTML = historyData.label.replace(/　/g, ' ') // eslint-disable-line
  document.getElementById('abstract').innerHTML = historyData.abstract.replace(/　/g, ' ') // eslint-disable-line
  document.getElementById('close-explain-button').addEventListener('click', function () {
    explainElement.classList.add('fadeout-explain')
    explainElement.classList.remove('fadein-explain')
  })
}

function updateResult (input) {
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
  const searcheWordApi = await searchKeyword(keyword)
  searchResults = searcheWordApi
  let results = ''
  const resultsArray = []
  for (let i = 0; i < searchResults.length; i++) {
    const labelSearch = searchResults[i].label.toLowerCase().indexOf(keyword)
    if (labelSearch !== -1) {
      const result = generateResult(keyword, searchResults[i].label, i, true)
      results += result
      resultsArray.push(i)
    }
  }
  for (let i = 0; i < searchResults.length; i++) {
    const labelSearch = searchResults[i].label.toLowerCase().indexOf(keyword)
    if (labelSearch === -1) {
      const abstractSearch = searchResults[i].abstract.toLowerCase().indexOf(keyword)
      if (abstractSearch !== -1) {
        const start = (abstractSearch >= wordValue / 2) ? abstractSearch - wordValue / 2 : 0
        const result = generateResult(keyword, searchResults[i].abstract.substr(start, wordValue), i, false)
        results += result
        resultsArray.push(i)
      }
    }
  }
  document.getElementById('search-results').innerHTML = results
  if (results !== '') {
    for (let i = 0; i < resultsArray.length; i++) {
      clickResult(resultsArray[i])
    }
  }
}

function generateResult (keyword, matchSentence, arrayNum, jugeLabel) {
  const wordsPattern = keyword
    .trim()
    .replaceAll(/[.*+?^=!:${}()|[\]/\\]/g, '\\$&')
  const pattern = new RegExp(wordsPattern, 'i')
  const matchWord = matchSentence.replace(/　/g, ' ').replace( // eslint-disable-line
    pattern,
    '<strong class=\'matched_word\'>$&</strong>'
  )
  let resultElement
  if (jugeLabel) {
    resultElement = `<div class="search-result" id="search-result${arrayNum}" value="${arrayNum}">` +
    `<div class='search-result__title'>${matchWord}</div>` +
    '</div>'
  } else {
    resultElement = `<div class="search-result" id="search-result${arrayNum}" value="${arrayNum}">` +
    `<div class='search-result__title'>${searchResults[arrayNum].label.substr(0, wordValue)}</div>` +
    `<div class='search-result__body'><p>${matchWord}</p></div>` +
    '</div>'
  }
  return resultElement
}

function clickResult (arrayNum) {
  document.getElementById(`search-result${arrayNum}`).addEventListener('click', async function () {
    const resultEra = Math.floor(Number(searchResults[arrayNum].accrual_date.slice(0, -6)) / 100) * 100
    const resultSlidesr = `<p class="era"><span id="current-value">${resultEra}</span> Year</p>` +
    `<input type="range" id="era" min="-400" max="2000" step="100" value="${resultEra}">`
    document.getElementById('slider-container').innerHTML = resultSlidesr
    setSlider()
    showMarker(resultEra)
    showMarkerInfo(searchResults[arrayNum])
    const searcheEraAPI = await searchEra(resultEra)
    let makerNum
    for (let i = 0; i < searcheEraAPI.length; i++) {
      if (searcheEraAPI[i].id === searchResults[arrayNum].id) {
        makerNum = i
      }
    }
    changeColor(makerNum, clickColor)
    map.panTo(new google.maps.LatLng(searchResults[arrayNum].latitude, searchResults[arrayNum].longitude)) // eslint-disable-line
  }, false)
}

function setSlider () {
  inputElem = document.getElementById('era')
  currentValueElem = document.getElementById('current-value')
  inputElem.addEventListener('input', rangeOnChange)
}

function pinSymbol (color) {
  return {
    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 2,
    scale: 1
  }
}
function changeColor (i, color) {
  restoreColors(markers[i])
  selectedMarker = markers[i]
  markers[i].setIcon(pinSymbol(color))
}
function restoreColors (selectMarker) {
  if (selectedMarker != null && selectedMarker !== selectMarker) {
    selectedMarker.setIcon(pinSymbol(originColor))
  }
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

window.onload = function () {
  initMap()
  searchButtonAction()
  setCurrentValue(inputElem.value)
}

function searchEra (era) {
  const url = '/api/maps/searche_year'
  const data = { era: era }
  const queryParams = new URLSearchParams(data)
  return fetch(`${url}?` + queryParams) // eslint-disable-line
    .then(response => response.json())
}

function searchKeyword (keyword) {
  const url = '/api/maps/searche_word'
  const data = { keyword: keyword }
  const queryParams = new URLSearchParams(data)
  return fetch(`${url}?` + queryParams) // eslint-disable-line
    .then(response => response.json())
}
