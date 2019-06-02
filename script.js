var api = 'https://fcc-weather-api.glitch.me/api/current?';
// https://api.darksky.net/forecast/a60c1423cff278e60b4c1294e9673f6b/37.8267,-122.4233
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = 'lat=' + position.coords.latitude;
      var lon = 'lon=' + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }

  $('#change-unit').click(function() {
    var currentTempUnit = $('#temp-unit').text();
    var newTempUnit = currentTempUnit == 'C' ? 'F' : 'C';
    $('#temp-unit').text(newTempUnit);
    if (newTempUnit == 'F') {
      var fahTemp = Math.round((parseInt($('#temp').text()) * 9) / 5 + 32);
      $('#temp').text(fahTemp + ' ' + String.fromCharCode(176));
      $('#change-unit').text('change to Celsius');
    } else {
      $('#temp').text(currentTempInCelsius + ' ' + String.fromCharCode(176));
      $('#change-unit').text('change to Fahrenheit');
    }
  });

  async function getWeather(lat, lon) {
    var urlString = api + lon + '&' + lat;
    $.ajax({
      url: urlString,
      success: function(result) {
        $('#city').text(result.name + ', ');
        $('#country').text(result.sys.country);
        currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
        $('#temp').text(currentTempInCelsius + ' ' + String.fromCharCode(176));
        $('#temp-unit').text(tempUnit);
        $('#weather-condition').text(result.weather[0].description);
        addIcon(result.weather[0].icon);
      }
    });
  }
});
function addIcon(weatherIcon) {
  var icon = document.querySelector('#icon');
  icon.setAttribute('src', weatherIcon);
}
