let map                = null,
    marker             = null,
    centerMap          = null,
    firstAddress       = document.getElementById('firstAddress'),
    secondAddress      = document.getElementById('secondAddress'),
    search             = document.getElementById('search'),
    geocoder           = null,
    directionsService  = null,
    directionsRenderer = null,
    stepDisplay        = null;

function initMap() {

    showMyPosition();

    map = new google.maps.Map(document.getElementById('map'), {
        center: centerMap,
        zoom: 14,
    });   
    
    directionsService = new google.maps.DirectionsService;
    directionsRenderer = new google.maps.DirectionsRenderer({map: map});
    stepDisplay = new google.maps.InfoWindow;
}

    search.addEventListener('click', () => {
        if (firstAddress.value == "" || secondAddress.value == "") {
            alert('Не введен адресс(((')
        } else {
            calculateAndDisplayRoute(
                directionsRenderer, directionsService, stepDisplay, map);
        }
    });


    function calculateAndDisplayRoute(directionsRenderer, directionsService, stepDisplay, map) {

        directionsService.route({
            origin: firstAddress.value,
            destination: secondAddress.value,
            travelMode: 'DRIVING'
        }, function(response, status) {

            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    function showMyPosition () {

        geocoder = new google.maps.Geocoder;

        navigator.geolocation.getCurrentPosition(function(position) {
            centerMap = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
            console.log(centerMap);
            map.setCenter(centerMap);
            marker = new google.maps.Marker({
                position: centerMap, 
                map: map
            });
            geocoder.geocode({'location': centerMap}, function(results, status){
                firstAddress.value = results[0].formatted_address;
            });
        });
    };


