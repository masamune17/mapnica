function initMap() {
const marker = [];
const markerData = JSON.parse(document.querySelector("#marker-data").dataset.position);
console.log(markerData)

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
    }
}

window.onload = function() {
  initMap();
}

