
// When the window has finished loading google map fire off
google.maps.event.addDomListener(window, 'load', init);
  
    
function init() {
    
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions    
  var latLng = new google.maps.LatLng(-34.397, 150.644);// The latitude and longitude to center the map (required)
    
  var mapOptions = {
    zoom: 8, // How zoomed in you want the map to start at (required)
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,  
    // How to style the map. 
    // This is where I paste style found on Snazzy Maps  
    styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"color":"#f6b221"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"color":"#f6b221"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
          
  };
    
  // Get the HTML DOM element that will contain your map 
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('gllpMap');

  // Create the Google Map using our element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);
  
  
  // Add draggable marker, more info "https://developers.google.com/maps/documentation/javascript/markers"    
  var marker = new google.maps.Marker({
    position: latLng, //identifying the initial location of the marker(required)
    title: 'Sunbathing Place',
    map: map,//specifies the Map on which to place the marker
    draggable: true 
  });
    
 marker.addListener('dragend', function() {
  
    marker.setAnimation(google.maps.Animation.BOUNCE); 
});    


  // Add dragging event listeners.

  google.maps.event.addListener(marker, 'dragend', function() {
      
        var latitudeValue = marker.getPosition().lat();
        var longitudeValue = marker.getPosition().lng();
        var latitudeElement = document.getElementById('gllpLatitude');
        var longitudeElement = document.getElementById('gllpLongitude');
        latitudeElement.innerText = latitudeValue;
        longitudeElement.innerText = longitudeValue;
  });
  
    
var geocoder = new google.maps.Geocoder(); //access the Google Maps API geocoding service, more info "https://developers.google.com/maps/documentation/javascript/geocoding"

 ///////////////////CHECK THIS OUT////////////////////////////// 
 
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
    });
    
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = []
          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              title: place.name,
              position: place.geometry.location,
              draggable: true    
            }));

          
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
        
        var latitudeValue = marker.getPosition().lat();
        var longitudeValue = marker.getPosition().lng();
        var latitudeElement = document.getElementById('gllpLatitude');
        var longitudeElement = document.getElementById('gllpLongitude');
        latitudeElement.innerText = latitudeValue;
        longitudeElement.innerText = longitudeValue;
        
        map.fitBounds(bounds);
        });
    
    
    
    
    
    
    
    
    
};




