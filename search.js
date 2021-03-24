/**  
* Function to calculate current position  
* @function getLocation
*/
function getLocation() {
  if (navigator.geolocation) {
  /** Call show position function to get the coordinates */
  navigator.geolocation.getCurrentPosition(showPosition);
  }
}

/**  
* Function to get the latitude and longitude positions  
* @function showPosition
* @param {String} position position on the map
*/
function showPosition(position) {
  /** Get latitude coordinate 
  * @var {number} lat
  */
  var lat =  position.coords.latitude;   
  /** Get longitude coordinate 
  * @var {number} long
  */
  var long = position.coords.longitude;
  /** Combine both latitude and longutide 
  * @var {String} location
  */
  var location = lat + ","+ long;
  console.log(location); 
}

/**  
* Function to calculate current geo location of the user
* @function current_location
*/
function current_location(){
  /** Call show position function to get the coordinates */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
      /** Get latitude coordinate */
      var lat =  position.coords.latitude;
      /** Get longitude coordinate */
      var long = position.coords.longitude;
      /** Combine both latitude and longutide */
      var location = lat + ","+ long;
      console.log(location); 
      //Call get address function to calculate address based on latitude and longitude coordinates
      getAddress(lat,long);
      /**  
      * Function to get adress from the latitude and longitude coordinates 
      * @function getAddress
      * @param {String} latitude latitude coordinate
      * @param {String} longitude longitude coordinate
      */  
      function getAddress(myLatitude,myLongitude) {
        /** Create a geocoder object from Google maps API: 
        *{@link https://maps.googleapis.com/maps/api/js}
        * @var {object} geocoder
        */
        var geocoder	= new google.maps.Geocoder();	
        /** Create a location object for latitude and longitude coordinates from Google Maps API:
        *{@link https://maps.googleapis.com/maps/api/js}
        * @var {object} location
        * @param {String} latitude latitude coordinate
        * @param {String} longitude longitude coordinate
        */
        var location	= new google.maps.LatLng(myLatitude, myLongitude);
        /** Turn coordinates into an object */
        geocoder.geocode({'latLng': location}, function (results, status) {
          /** if geocode is successful, pass the address to the location placeholder */
          if(status == google.maps.GeocoderStatus.OK) {					
            document.getElementById("loc").value= results[0].formatted_address;					
          } 
        });
      }
    }
}

/**  
* Function to calculate geo location that shows latitude and longitude positions of the based on user input for location
* @function search
*/
function search(){
  if(document.getElementById("loc").value.length == 0) {
     getLocation();
  } else {
      var geocoder = new google.maps.Geocoder();
      var address= document.getElementById("loc").value;
      geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              /** Get latitude coordinate */
              var lat = results[0].geometry.location.lat();
              /** Get longitude coordinate */
              var long= results[0].geometry.location.lng();
              /** Combine both latitude and longutide */
              var location = lat + ","+ long;
              console.log(location); 
              /** Get radius value input given by user */
              var radius=document.getElementById("rad").value;
              console.log(radius);
              /** Pass location details to results page to generate map and list results */
              localStorage.setItem("latitude", lat);
              localStorage.setItem("longitude", long);
              localStorage.setItem("radius", radius);
              /**  Call results.html page on click of search */
              window.location.href = "results.html";
          }
      });
  }
}

var expanded = false;

/**  
* Function to exapnd the checbox dropdown for activities filter
* @function showCheckboxes1
*/
function showCheckboxes1() {
var checkboxes = document.getElementById("checkboxes1");
if (!expanded) {
  checkboxes.style.display = "block";
  expanded = true;
} else {
  checkboxes.style.display = "none";
  expanded = false;
}
}

/**  
* Function to exapnd the checbox dropdown for interests filter
* @function showCheckboxes2
*/
function showCheckboxes2() {
  var checkboxes = document.getElementById("checkboxes2");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

/**  
* Function to reset the inputs of filter parameters
* @function reset
*/
function reset() {
  document.getElementById("filter").reset();
}
