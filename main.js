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
    var weatherIcon = response.weather[0].icon
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
 
    
    $("#cityName").html(city.value)
    $("#currentWeatherImg").append('src' , iconURL)
    $("#temperature").text(`Temperature: ${temp} \xB0F`);
    $("#humidity").text(`Humidty: ${humidity} %`)
    $("#windSpeed").text(`Wind Speed: ${windSpeed} MPH`)
    
    var newImg = $('<img>');
    newImg.attr('src', iconURL);
     $('#cityName').append(newImg)
   

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
    var day1day = fResponse.list[0].dt_txt;
    var day2day = fResponse.list[8].dt_txt;
    var day3day = fResponse.list[16].dt_txt;
    var day4day = fResponse.list[24].dt_txt;
    var day5day = fResponse.list[32].dt_txt;
    var weatherIcon1 = fResponse.list[0].weather[0].icon;
    var weatherIcon2 = fResponse.list[8].weather[0].icon;
    var weatherIcon3 = fResponse.list[16].weather[0].icon;
    var weatherIcon4 = fResponse.list[24].weather[0].icon;
    var weatherIcon5 = fResponse.list[32].weather[0].icon;
    var day1temp = fResponse.list[0].main.temp;
    var day2temp = fResponse.list[8].main.temp;
    var day3temp = fResponse.list[16].main.temp;
    var day4temp = fResponse.list[24].main.temp;
    var day5temp = fResponse.list[32].main.temp;
    var day1humidity = fResponse.list[0].main.humidity;
    var day2humidity = fResponse.list[8].main.humidity;
    var day3humidity = fResponse.list[16].main.humidity;
    var day4humidity = fResponse.list[24].main.humidity;
    var day5humidity = fResponse.list[32].main.humidity;
    
    $('#day1day').html(day1day);
    $('#day2day').html(day2day);
    $('#day3day').html(day3day);
    $('#day4day').html(day4day);
    $('#day5day').html(day5day);

    $('#day1temp').html(`Temperature: ${day1temp} \xB0F`);
    $('#day2temp').html(`Temperature: ${day2temp} \xB0F`);
    $('#day3temp').html(`Temperature: ${day3temp} \xB0F`);
    $('#day4temp').html(`Temperature: ${day4temp} \xB0F`);
    $('#day5temp').html(`Temperature: ${day5temp} \xB0F`);

    $('#day1humidity').html(`Humidty: ${day1humidity} %`)
    $('#day2humidity').html(`Humidty: ${day2humidity} %`)
    $('#day3humidity').html(`Humidty: ${day3humidity} %`)
    $('#day4humidity').html(`Humidty: ${day4humidity} %`)
    $('#day5humidity').html(`Humidty: ${day5humidity} %`)

    // var img1 = $('<img>');
    // img1.attr('src', weatherIcon1, iconURL);
    // $('#weatherIcon1').append(img1);

})
})