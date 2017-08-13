
// When the window has finished loading google map fire off
google.maps.event.addDomListener(window, 'load', init);
  
    
function init() { 
   
//////////////////////////VARIABLES//////////////////////////
    
    var latLng = new google.maps.LatLng(40.700, -73.816);// The latitude and longitude to center the map (required)
    
    var mapOptions = {
        zoom: 7, // How zoomed in you want the map to start at (required)
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false, 
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,  
        zoomControlOptions: {
            position:google.maps.ControlPosition.LEFT_CENTER,
        },  
        // This is where I paste style found on Snazzy Maps  
        styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"color":"#f6b221"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"color":"#f6b221"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
          
    };
    
    // HTML DOM element that contain your my map
    var mapElement = document.getElementById('gllpMap');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
  
    
    
    // Add draggable marker   
    var marker = new google.maps.Marker({
        position: latLng, //identifying the initial location of the marker(required)
        title: 'Sunbathing Place',
        map: map,//specifies the Map on which to place the marker
        icon: '/image/Marker.PNG',
        draggable: true 
    });
    
    var latitudeValue = 0;
    var longitudeValue = 0;
    var latitudeElement = document.getElementById('gllpLatitude');
    var longitudeElement = document.getElementById('gllpLongitude');
    
    var geocoder = new google.maps.Geocoder(); //access the Google Maps API geocoding service, more info "https://developers.google.com/maps/documentation/javascript/geocoding"
    
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    
////////////////////////FUNCTION///////////////////////////////    
    
    function setLatLngAndBounce(marker){
        
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 2100);
        latitudeValue = marker.getPosition().lat();
        longitudeValue = marker.getPosition().lng();
        latitudeElement.innerText = latitudeValue;
        longitudeElement.innerText = longitudeValue;
    }
    
///////////////////////EVENTS//////////////////////////////////    
    
    // Dragging event listener
    
    marker.addListener('dragend', function() {
     
      setLatLngAndBounce(marker) 
    }); 

    // Set the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
    });
    
    // Event fired when the user selects a prediction and retrieve from search box
    searchBox.addListener('places_changed', function() {
         
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old marker
          marker.setMap(null);
          
          // For each place name and location.
          var bounds = new google.maps.LatLngBounds();
          // For each place name and location.
          places.forEach(function(place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                return;
                }

                // Create a  new marker
                marker = new google.maps.Marker({
                    map: map,
                    title: place.name,
                    position: place.geometry.location,
                    draggable: true    
                });
            
                if (place.geometry.viewport) {
              // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                }else{
                    bounds.extend(place.geometry.location);
                }
          });
        
        marker.addListener('dragend', function() {
  
            setLatLngAndBounce(marker);
            
        });
        
        setLatLngAndBounce(marker);
        
        map.fitBounds(bounds);
        });  

 };



