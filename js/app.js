// La funcionalidad de tu proyecto
let lab = () => {
    let inputOrigin = document.getElementById('origin'),
    inputDestination = document.getElementById('destiny'),
    btnRout = document.getElementById('btn-rout'),
    autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin),
    autocompleteDestination = new google.maps.places.Autocomplete(inputDestination),
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer;
    
  
    let getPosition = localizacion => {
      let latitude = localizacion.coords.latitude,
      longitude = localizacion.coords.longitude;
      const mapBox = document.getElementById('map');
      map = new google.maps.Map(mapBox, {
        zoom: 15,
        center: {
          lat: latitude,
          lng: longitude
        }
      });
      let miUbicacion = new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude
        },
        animation: google.maps.Animation.DROP,
        map: map,
        // icon: icon,
      });
      let calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
        directionsService.route({
          origin: inputOrigin.value,
          destination: inputDestination.value,
          travelMode: 'WALKING'
  
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('No se encontro ruta');
          }
        });
        directionsDisplay.setMap(map);
      };
      let trazarRuta = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      btnRout.addEventListener('click', trazarRuta);
    };
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      alert('La geolocalización no está disponible en el navegador');
    }
    
  };
  window.addEventListener('load', lab);