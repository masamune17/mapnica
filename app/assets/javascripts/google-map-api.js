const inputElem = document.getElementById('era');
let era = Number(inputElem.value)
const currentValueElem = document.getElementById('current-value');
const marker = [];
var markerData,historyData;
const setCurrentValue = (val) => {
  currentValueElem.innerText = val;
  era = Number(val)
}

const rangeOnChange = (e) =>{
  setCurrentValue(e.target.value);
}

function input(){
  markerData = JSON.parse(document.querySelector("#marker-data").dataset.position);
  historyData = JSON.parse(document.querySelector("#history-data").dataset.history);
}

async function initMap() {
  const dataInput = await input()
const map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: markerData[0][0],
    lng: markerData[0][1]},
  zoom: 4
  });
  
    for (var i = 0; i < markerData.length; i++) {
      // const year = Number(markerData[i][2].match(/\d+/))
      const year = Number(markerData[i][2].slice( 0, -6 ))
      if( era <= year && year < era + 100) {
        markerLatLng = new google.maps.LatLng({
          lat: markerData[i][0],
          lng: markerData[i][1]
        });

        marker[i] = new google.maps.Marker({
          position: markerLatLng,
          map: map
        });

        markerEvent(i);
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

window.onload = function() {
  // initMap(); 
  // 変更に合わせてイベントを発火する
  inputElem.addEventListener('input', rangeOnChange)
  inputElem.addEventListener('input', initMap)
  // ページ読み込み時の値をセット
  setCurrentValue(inputElem.value);

}
