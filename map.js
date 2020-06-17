var marker=new Array();
var mymap;
var ID=new Array();


var redIcon = new L.Icon({
		iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
		});



function initMap()
			{

			

			console.log('Page chargée');
			 // On annonce dans la console que la page est chargé 
			mymap = L.map('mapid').setView([48, -4.4879733], 2); // On crée la carte
			// PARAMETRE DE LA CARTE
			var tileStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		    	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		    		maxZoom: 18,
		    		id: 'mapbox/streets-v11',
		    		accessToken: 'pk.eyJ1IjoibWF4ZW5jZXIiLCJhIjoiY2s1bWhtaWFuMDdudjNrbDVrZjM4ZWIyZiJ9.ZTCWW0WjcJIl_YMryhphDw'
		    		})
			// PARAMETRE DE LA CARTE

			// COULEUR DU MARKER EN URGENCE

			// COULEUR DU MARKER EN URGENCE
			tileStreets.addTo(mymap); // On ajoute les paramétres a notre carte
			//marker = L.marker([48, -4.4879733]).addTo(mymap); // On crée un marqueur sur la carte
			//marker.bindPopup("Pecheur").openPopup();

			 // On ajoute une pop up  lorsque l'on clique dessus
			 
			
			function changebindPopup(mmsi,lat,lng) // Fonction qui met a jour le POPUP
			{
				console.log("Change bind popup marker["+mmsi+"]");
				console.log(marker[mmsi]);
				marker[mmsi]._popup.setContent("MMSI : " +mmsi.toString()+ " <br> Position : " + lat.toString()+ ";" + lng.toString())
			}

			// ON CREE UN POP UP QUI APPARAIT LORSQUE L'ON CLIQUE SUR LA MAP AFFICHER LES CO
			var popup = L.popup(); 

			function onMapClick(e) {
    			popup
        		.setLatLng(e.latlng)
        		.setContent("You clicked the map at " + e.latlng.toString())
        		.openOn(mymap);
			}



			// ON REFRESH LE MARKER EN CAS D'URGENCE

			
			//mymap.on('click', onMapClick);
			//var socket = io();
			

	      /*var send = function () { // ON envoie a tous les info pour que tout les utilisateurs ait bien leur page a jour
	        var text = document.getElementById('m').value;
	        socket.emit('pos_gps',text);
	      }*/

	      var receive = function(msg) { // On recois un message , et on l'affiche dans une liste
	        /*var li = document.createElement('li');
	        li.innerText = msg;
	        document.getElementById('messages').appendChild(li);*/
	        console.log(msg);
	       	coords=msg.split(';');
	        lat=parseFloat(coords[0]);
	        lng=parseFloat(coords[1]);       // ICI on split le msg recu pour séparer les différentes info
	        alrt=parseFloat(coords[2]);
	        mmsi=parseFloat(coords[3]);
	        
	        var deja=0;

	        for(idx=0;idx<ID.length;idx++)
	        	{
	        		console.log(ID[idx]," ",mmsi);
	        		if(ID[idx]===mmsi)
	        		{
	        			console.log("Déja affiché")
	        			deja=1;
	        			refreshMarker(mmsi,lat,lng);
	        		}

	        	}
	        if(deja!=1)
	        {
	        	if (alrt=1) {
  					newMarker(mmsi,lat,lng);
  					updatebdd();
  					//changebindPopup(mmsi,lat,lng)	// SI dans le message recu alerte est égale a 1 alors on change la couleur et la pop up du marker
					//document.getElementById('xyz').play();
					ID[ID.length]=mmsi;
	        		console.log("Création d'un nouveau marqueur");
	        		deja=0;				// Grace a alerte() et changebindPopup()
				} 
	        }       
	      }
	      var socket = io();
	      socket.on('pos_gps', receive);
			}

function refreshMarker(mmsi, lat, lng)
			{
				var latlong = L.latLng(lat,lng);
	        	marker[mmsi].setLatLng(latlong);
	        	mymap.setView([lat,lng],4);
	        	console.log(latlong);
	        	//marker[mmsi].bindPopup(latlong).openPopup();

			}
			// ON CHANGE LA COULEUR DU MARQUEUR
			
function newMarker(mmsi, lat, lng)
			{
				var latlong = L.latLng(lat,lng);
				marker[mmsi] = L.marker(latlong).addTo(mymap);
				console.log("Marker[" + mmsi + "] crée!")
				mymap.setView(latlong, 4)
				
				//https.get('http://localhost/monsite/balise_bdd.php?MMSI=48&action=addPos';

				//marker[mmsi].bindPopup(latlong).openPopup();
			}

function updatebdd()
			{	
			if (window.XMLHttpRequest) {
			console.log('xmlhttp has been created');
    		// code for modern browsers
    		xmlhttp = new XMLHttpRequest();
 			} else {
 				console.log('You are using a older version of you website , you should upgrade it');
    		// code for old IE browsers
    		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			}
//http://192.168.0.30/monsite/index.php/monsite/balise_bdd.php?MMSI=25&action=del