var apiToday = "http://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&appid=f64bc4198de67489ead6d5ca4ee4bd1b";
var units = "&units=imperial";
var apiForcast = "http://api.openweathermap.org/data/2.5/forecast?q=";
var apiUvIndex = "http://api.openweathermap.org/data/2.5/uvi?";
var forcastBoxes = $('.forcastBoxes');
// added this array TEST //
var citySearchArr = [];
var currentWeatherArr = [];





// on button click run the Current Forcast, UV index, and Future Forcast //
$(".submit").on("click", function(event) {
  event.preventDefault(); 

  

  $('.forcastBoxes').show()

  // calls the api for todays weather //
  var url = apiToday + city.value + apiKey + units;

  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    var weatherIcon = response.weather[0].icon;

    // api for the weather Icons
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";

    $("#cityName").html(city.value);
    $("#currentWeatherImg").append("src", iconURL);
    $("#temperature").text(`Temperature: ${temp} \xB0F`);
    $("#humidity").text(`Humidty: ${humidity} %`);
    $("#windSpeed").text(`Wind Speed: ${windSpeed} MPH`);

    var newImg = $("<img>");
    newImg.attr("src", iconURL);
    $("#cityName").append(newImg);

   // Local Storage //
    var currentWeather = {
     cityName: city.value,
     temperature: temp,
     humidity: humidity,
     windSpeed: windSpeed,
   }
   currentWeatherArr.push(currentWeather)
   var cWeather = JSON.stringify(currentWeatherArr)

   localStorage.setItem('currentWeather', cWeather);
    

    // Api for UV Index //
    var urlUvIndex = apiUvIndex + `lat=${lat}` + `&lon=${lon}` + apiKey;
    $.ajax({
      url: urlUvIndex,
      method: "GET",
    }).then(function (uvResponse) {
      uvIndex = uvResponse.value;
      

      if (uvIndex <= 2) {
        $("#uvIndex").css("color", "green");
        $('#uvIndex').html(`UV Index: ${uvIndex} Low`)
      } else if (uvIndex > 2 && uvIndex <= 5){ 
        $("#uvIndex").css("color", "yellow");
        $('#uvIndex').html(`UV Index: ${uvIndex} Moderate`)
      }
        else if (uvIndex > 5 && uvIndex <=7){
        $('#uvIndex').css('color', 'orange');
        $('#uvIndex').html(`UV Index: ${uvIndex} High`)
        }
        else if (uvIndex > 7 && uvIndex <= 11){
            $('#uvIndex').css('color', 'red');
            $('#uvIndex').html(`UV Index: ${uvIndex} Very high`)
        }
        else {
            $('#uvIndex').css('color', 'violet');
            $('#uvIndex').html(`UV Index: ${uvIndex} Extreme`)
        }

    });

    // api for the 5 day forcast //
    var urlForcast = apiForcast + city.value + apiKey + units;
    $.ajax({
      url: urlForcast,
      method: "GET",
    }).then(function (fResponse) {
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

      
      $("#day1day").html(day1day);
      $("#day2day").html(day2day);
      $("#day3day").html(day3day);
      $("#day4day").html(day4day);
      $("#day5day").html(day5day);

      $("#weatherIcon1").html("<img src='http://openweathermap.org/img/w/" + weatherIcon1 + ".png'>");
      $("#weatherIcon2").html("<img src='http://openweathermap.org/img/w/" + weatherIcon2 + ".png'>");
      $("#weatherIcon3").html("<img src='http://openweathermap.org/img/w/" + weatherIcon3 + ".png'>");
      $("#weatherIcon4").html("<img src='http://openweathermap.org/img/w/" + weatherIcon4 + ".png'>");
      $("#weatherIcon5").html("<img src='http://openweathermap.org/img/w/" + weatherIcon5 + ".png'>");
  
      $("#day1temp").html(`Temperature: ${day1temp} \xB0F`);
      $("#day2temp").html(`Temperature: ${day2temp} \xB0F`);
      $("#day3temp").html(`Temperature: ${day3temp} \xB0F`);
      $("#day4temp").html(`Temperature: ${day4temp} \xB0F`);
      $("#day5temp").html(`Temperature: ${day5temp} \xB0F`);

      $("#day1humidity").html(`Humidty: ${day1humidity} %`);
      $("#day2humidity").html(`Humidty: ${day2humidity} %`);
      $("#day3humidity").html(`Humidty: ${day3humidity} %`);
      $("#day4humidity").html(`Humidty: ${day4humidity} %`);
      $("#day5humidity").html(`Humidty: ${day5humidity} %`);

      
      
      // appending cities to new <li> //
       var userCityValue = $('#city').val();
       citySearchArr.push(userCityValue);
      

       var newUserSearch = $('#city').val();
       var li = $('<li>');
       $('#userSearches').append(li);
       li.prepend(newUserSearch);

      // local storage for cities user has searched for //
       var savedSearches = JSON.stringify(citySearchArr);
       localStorage.setItem('savedSearches', savedSearches);

      
       
    

    });
  });
});

var userS = JSON.parse(localStorage.getItem('savedSearches'));

// li.append(userS)