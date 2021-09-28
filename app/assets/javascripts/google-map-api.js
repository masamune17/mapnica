const marker = [];
const infoWindow = [];
// const test = document.querySelector("#marker-data").dataset.position
const markerData = JSON.parse(document.querySelector("#marker-data").dataset.position);
const historyData = JSON.parse(document.querySelector("#history-data").dataset.history);

console.log(markerData)
console.log(markerData[0][0])
console.log("テスト")
async function initMap() {
const map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: markerData[0][0],
    lng: markerData[0][1]},
  zoom: 4
  });
  
    for (var i = 0; i < markerData.length; i++) {
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
    console.log(markerData[0])
}

function markerEvent(i) {
  marker[i].addListener('click', function() {
    
    document.getElementById("accrual_date").innerHTML = markerData[i][2]
    document.getElementById("label").innerHTML = markerData[i][3]    
    document.getElementById("abstract").innerHTML = historyData[i]
});
}

window.onload = function() {
  initMap();
}
