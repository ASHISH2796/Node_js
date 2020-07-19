mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VwdGFhc2hpc2giLCJhIjoiY2tjcWx5Z3NoMTY4ODJ5bGhyaDhzM3U5NCJ9.v_Zy_QRnf4hsQtAcHO2xkw';
          
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: post.coordinates,
  zoom: 8
});

// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat(post.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
.addTo(map);