import { map } from './main.js'
import { searchYear } from './search_year.js'

let markerData, selectedMarker
const markers = []
const originColor = 'red'
export const clickColor = 'blue'

export class Marker {
  static showMarker(year) {
    async function generateMarker() {
      const searcheYearAPI = await searchYear(year)
      markerData = searcheYearAPI
      if (markers !== []) {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null)
        }
      }
      for (let i = 0; i < markerData.length; i++) {
        // prettier-ignore
        const markerLatLng = new google.maps.LatLng({ // eslint-disable-line
          lat: markerData[i].latitude,
          lng: markerData[i].longitude
        })
        // prettier-ignore
        markers[i] = new google.maps.Marker({ // eslint-disable-line
          position: markerLatLng,
          map: map,
          icon: Marker.pinSymbol(originColor)
        })
        Marker.markerEvent(i)
      }
    }
    generateMarker()
  }

  static markerEvent(i) {
    markers[i].addListener('click', function () {
      Marker.showMarkerInfo(markerData[i])
      Marker.changeColor(i, clickColor)
    })
  }

  static showMarkerInfo(historyData) {
    const explainElement = document.getElementById(
      'main-explain-item-container'
    )
    if (explainElement.classList.contains('fadeout-explain')) {
      explainElement.classList.remove('fadeout-explain')
    }
    explainElement.classList.add('fadein-explain')
    document.getElementById('accrual_date').innerHTML = historyData.accrual_date
    // prettier-ignore
    document.getElementById('label').innerHTML = historyData.label.replace(/　/g, ' ') // eslint-disable-line
    // prettier-ignore
    document.getElementById('abstract').innerHTML = historyData.abstract.replace(/　/g, ' ') // eslint-disable-line
    document
      .getElementById('close-explain-button')
      .addEventListener('click', function () {
        explainElement.classList.add('fadeout-explain')
        explainElement.classList.remove('fadein-explain')
      })
    document.onclick = closeExplainForClick
    let clickTime = 0
    function closeExplainForClick() {
      clickTime += 1
      if (clickTime > 1) {
        explainElement.classList.add('fadeout-explain')
        explainElement.classList.remove('fadein-explain')
      }
    }
  }

  static pinSymbol(color) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1
    }
  }

  static changeColor(i, color) {
    Marker.restoreColors(markers[i])
    selectedMarker = markers[i]
    markers[i].setIcon(Marker.pinSymbol(color))
  }

  static restoreColors(selectMarker) {
    if (selectedMarker != null && selectedMarker !== selectMarker) {
      selectedMarker.setIcon(Marker.pinSymbol(originColor))
    }
  }
}
