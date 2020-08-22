mapboxgl.accessToken = mapBoxToken;
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: post.geometry.coordinates,
  zoom: 8
});

// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat(post.geometry.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
.addTo(map);

// review Edit/Update 
$('.toggle-edit-form').on('click',function(){
  $(this).text() ==='Edit' ? $(this).text('Cancel') : $(this).text('Edit') ;
  $(this).siblings('.edit-review-form').toggle();
});
