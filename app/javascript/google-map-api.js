const inputElem = document.getElementById('era');
const currentValueElem = document.getElementById('current-value');
const marker = [];
const setCurrentValue = (val) => {
  currentValueElem.innerText = val;
  era = Number(val)
}

const rangeOnChange = (e) =>{
  setCurrentValue(e.target.value);
}

let markerData = JSON.parse(document.querySelector("#marker-data").dataset.position);
let historyData = JSON.parse(document.querySelector("#history-data").dataset.history);

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: 41,
    lng: 12},
  zoom: 4
  });
  showMarker()
}

function showMarker(){
  for (let i = 0; i < markerData.length; i++) {
    const year = Number(markerData[i][2].slice( 0, -6 ))
    if( era <= year && year < era + 100) {      
      let markerLatLng = new google.maps.LatLng({
        lat: markerData[i][0],
        lng: markerData[i][1]
      });

      marker[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map
      });

      markerEvent(i);
    }else{
      if(marker[i] != null)　marker[i].setMap(null)
    }
  }
}

function markerEvent(i) {
  marker[i].addListener('click', function() {    
    document.getElementById("accrual_date").innerHTML = markerData[i][2]
    document.getElementById("label").innerHTML = historyData[i][0].replace(/　/g, ' ')
    document.getElementById("abstract").innerHTML = historyData[i][1].replace(/　/g, ' ')
});
}

// ページ読み込み時の値をセット 
window.onload = function() {  
  setCurrentValue(inputElem.value);
  initMap(); 
}
  // 変更に合わせてイベントを発火する
inputElem.addEventListener('input', rangeOnChange)
inputElem.addEventListener('input', showMarker)
