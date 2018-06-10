function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var centro = { lat: -23.5609, lng: -46.7336195 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: centro,
      mapTypeControl: false,
      gestureHandling: 'cooperative',
      styles: [{
          "elementType": "geometry",
          "stylers": [{ "color": "#f5f5f5" }],
        }, {
          "elementType": "labels.icon",
          "stylers": [{ "visibility": "off" }],
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#616161" }],
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#f5f5f5" }],
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#bdbdbd" }],
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{ "color": "#eeeeee" }],
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#757575" }],
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{ "color": "#e5e5e5" }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#9e9e9e" }],
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{ "color": "#ffffff" }],
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#757575" }],
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{ "color": "#dadada" }],
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#616161" }],
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#9e9e9e" }],
        }, {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{ "color": "#e5e5e5" }],
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{ "color": "#eeeeee" }],
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#c9c9c9" }],
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#9e9e9e" }],
        }
      ]
    });

    directionsDisplay = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    window.markers = [];
    var dados_ponto = document.getElementById("dados_ponto");
    var infowindow = null;

    var i = 0;
    for (i = 0; i < window.points.length; i++) {
        console.log(i, window.points_last_lotacao[i]);

        window.markers.push(new google.maps.Marker({
            position: window.points[i],
            map: map,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        }));

        markers[i].point_name = window.points_name[i];
        markers[i].last_lot = window.points_last_lotacao[i];
        markers[i].last_circ = new Date(window.points_last_circular_time[i]);
        markers[i].index = i;
        today = new Date()

        window.markers[i].addListener('click', function() {
            if (infowindow) {
                infowindow.close();
            }

            infowindow = new google.maps.InfoWindow({
                content: '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h1 id="firstHeading" class="firstHeading">'+this.point_name+'</h1>'+
                    '<div id="bodyContent">'+
                    '<p><b>Lota&cedil;&atilde;o</b></p>'+
                    '<progress value="'+this.last_lot+'" max="50"></progress>'+
                    '<p><b>Ultimo circular: há '+ Math.round((((today - this.last_circ) % 86400000) % 3600000) / 60000) +' minutos</b><br>'+
                    '<b>Lotação Média</b></p>'+
                    '</div>'+
                    '</div>'
            });

            infowindow.open(map, this);
        });

        if (window.points_last_lotacao[i] < 10)
            window.markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        else if (window.points_last_lotacao[i] < 20)
            window.markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
        else
            window.markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    }

    var bus_marker = new google.maps.Marker({
        position: centro,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'https://i.imgur.com/b1dN5ox.png'
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [
        {
            location: "Av. Prof. Almeida Prado, 531 - Butantã, São Paulo - SP, 05508-900",
            stopover: true
        }, {
            location: "Av. Prof. Lineu Prestes, 1604-1696 - Butantã, São Paulo - SP",
            stopover: true
        }, {
            location: "R. do Matão, 621-731 - Butantã, São Paulo - SP, 05508-090",
            stopover: true
        }, {
            location: "Av. Prof. Ernesto de Morães Leme, 5687-5885 - Morumbi, São Paulo - SP, 05651-002",
            stopover: true
        }
    ];

    directionsService.route({
        origin: "Av. Vital Brasil, 427 - Butantã, São Paulo - SP, 05503-001",
        destination: "Av. Vital Brasil, 427 - Butantã, São Paulo - SP, 05503-001",
        waypoints: waypts,
        optimizeWaypoints: false,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

}
