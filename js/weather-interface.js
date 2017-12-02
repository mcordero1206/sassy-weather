//References:
//https://openweathermap.org/weather-conditions
//https://www.learnhowtoprogram.com/javascript/asynchrony-and-apis-in-javascript/making-api-calls-with-jquery
$(document).ready(function () {
	'use strict';
	$('#weatherLocation').click(function () {
		var city = $('#location').val();
//		$('#location').val("");
		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=7e86610d1544c5aa01ff843d27fdc27f',
			type: 'GET',
			data: {
				format: 'json'
			},
			success: function (response) {
				var temp, description, condition, sassyRain, sassyStorm, sassyClear, sassyCloudy, sassySnow, sassyFog, sassyCold, sassyHot;
				temp = response.main.temp;
				condition = response.weather[0].main;
				description = response.weather[0].description;
				$('.showHumidity').text('The humidity in ' + response.name + ' is ' + response.main.humidity);
				$('.showTemp').text('The temperature in Farenheit is ' + temp + '.');
				$('.showCondition').text('The current weather condition in ' + response.name + ' is ' + condition + ' (' + description + ')');
				console.log(condition);
				
				sassyRain = ["rain, rain, go away", "i hate u rain", "today's forecast: meh."];
				sassyStorm = ["stay home, Dorothy", "evil laugh", "thunderstorm or no thunderstorm, I expect that report."];
				sassyClear = ["Beautiful day", "Go enjoy some sun!", "Summer Fridays, anyone?"];
				sassyCold = ["Baby, it's cold out there.", "Bundle up!", "Cuddling season is upon us."];
				sassyHot = ["Time to break out the mini desktop fans.", "Where's the pool, again?", "Walk through the Market, I'm sweatin'. Whoo!"];
				sassyCloudy = ["grey, grey, grey", "is it nap time yet?", "*yawn*"];
			    sassySnow = ["Winter wonderland!", "blanket or sheet, it's snowing!", "yay snow!"];
				sassyFog = ["Insert sassy comment about fog and/or mist", "Can't see a damn thing!", "Feels like Silent Hill"];
				
				var rand = Math.floor((Math.random() * 3) + 0);
				
				
				function between(x, min, max) {
					return x >= min && x <= max;
				}
				
				switch(condition) {
					case "Rain":	
						$('.sassy').text(sassyRain[rand]);
				    	break;
					case "Drizzle":
						$('.sassy').text(sassyRain[rand]);
				    	break;
					case "Thunderstorm":
						$('.sassy').text(sassyStorm[rand]);
						break;
					case "Clear":
						if(between(temp, 0, 54) || temp < 0) {
							$('.sassy').text(sassyCold[rand]);
						}
						else if(between(temp, 55, 85)) {
							$('.sassy').text(sassyClear[rand]);
						}
						else if(between(temp, 86, 100)) {
							$('.sassy').text(sassyHot[rand]);
						}
						break;
					case "Clouds":
						if(description === "overcast clouds") {
							$('.sassy').text(sassyCloudy[rand]);
						}
						else {
							if(between(temp, 0, 54) || temp < 0) {
							$('.sassy').text(sassyCold[rand]);
							}
							else if(between(temp, 55, 85)) {
							$('.sassy').text(sassyClear[rand]);
							}
							else if(between(temp, 86, 100)) {
							$('.sassy').text(sassyHot[rand]);
							}
						}
						break;
					case "Snow":
						$('.sassy').text(sassySnow[rand]);
						break;
					case "Fog":
					case "Mist":
					case "Haze":
						$('.sassy').text(sassyFog[rand]);	
						break;
					default:
						$('.sassy').text("must be some basic weather today.");
				}
				console.log(response);
			},
			complete: function(e){
				if(e.status === 404) {
					$('.errors').text('404! - City not found.');
				}
			},
			error: function () {
				$('.errors').text("There was an error processing your request. Please try again.");
			}
		});
		

	});
	
	
	$('#invert').click(function() {
		$('body').toggleClass('whiteOnBlack');
	});
	
	//Function to reload page at a given time. Source: https://stackoverflow.com/a/1217945
	function refreshAt(hours, minutes, seconds) {
    var now = new Date();
    var then = new Date();

    if(now.getHours() > hours ||
       (now.getHours() == hours && now.getMinutes() > minutes) ||
        now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function() { window.location.reload(true); }, timeout);
}

});
