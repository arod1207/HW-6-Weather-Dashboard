var apiToday = "http://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&appid=f64bc4198de67489ead6d5ca4ee4bd1b";
var units = "&units=imperial";
var apiForcast = "http://api.openweathermap.org/data/2.5/forecast?q=";
var apiUvIndex = "http://api.openweathermap.org/data/2.5/uvi?";


// on button click run the Current Forcast, UV index, and Future Forcast //
$('.submit').on('click', function(){

// calls the api for todays weather //   
var url = apiToday + city.value + apiKey + units;

$.ajax({
    url: url, 
    method: 'GET'})
.then(function(response){
    console.log(response) 
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    var weather = response.weather[0].main;
    var weatherIcon = response.weather[0].icon
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
 
    var newImg = $('<img>');
    var newDiv = $('<div>');
    var p = $('<p>').text(temp);
    var p2 = $('<p>').text(weather);
 

    newImg.attr('src', iconURL);
    $('body').append(newImg)
    $('body').append(newDiv);
    newDiv.append(p)
    newDiv.append(weather);
    newDiv.append(newImg);

// Api for UV Index //
    var apiUvIndexUrl = apiUvIndex +`lat=${lat}`+`&lon=${lon}`+ apiKey;
})

// api for the 5 day forcast //
var urlForcast = apiForcast + city.value + apiKey + units;
$.ajax({
    url: urlForcast,
    method: 'GET',
}).then(function(fResponse){
    console.log(fResponse);
})
})