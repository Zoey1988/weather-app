var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  $("#change-unit").click(function () {
    var currentTempUnit = $("#temp-unit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#temp-unit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
      $("#change-unit").text('change to Celsius');
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#change-unit").text('change to Fahrenheit');
    }
  });
  
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
      url: urlString, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#temp-unit").text(tempUnit);
      $("#weather-condition").text(result.weather[0].main);
      changeIcon(result.weather[0].main);
    }
  });
}
function changeIcon(weatherIcon){
  var weatherIcon = weatherIcon.toLowerCase();
  switch (weatherIcon) {
   case 'clouds':
     addIcon(weatherIcon)
     break;
   case 'rain':
     addIcon(weatherIcon)
     break;
   case 'snow':
     addIcon(weatherIcon)
     break;
   case 'clear':
     addIcon(weatherIcon)
     break;
   case 'thunderstom':
     addIcon(weatherIcon)
     break;
   default:
     $('#clouds').removeClass('hide');
 }
}

function addIcon(weatherIcon) {
  var weatherIcon = weatherIcon.toLowerCase();
   $('#' + weatherIcon).removeClass('hide');

}
});
