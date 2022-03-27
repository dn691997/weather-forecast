function GetInfo() {
	var newName = document.getElementById('cityInput');
	var cityName = document.getElementById('cityName');
	cityName.innerHTML = '--' + newName.value + '--';

	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=001cf736349c9bd14cf3767966562c10')
		.then(response => response.json())
		.then(data => {
			//Getting the min and max values for each day
			for (i = 0; i < 5; i++) {
				document.getElementById('day' + (i + 1) + 'Min').innerHTML = 'Min: ' + Number(data.list[i].main.temp_min).toFixed(1) + '°';
				//Number(1.3450001).toFixed(2); // 1.35
			}

			for (i = 0; i < 5; i++) {
				document.getElementById('day' + (i + 1) + 'Max').innerHTML = 'Max: ' + Number(data.list[i].main.temp_max).toFixed(2) + '°';
			}

			for (i = 0; i < 5; i++) {
				document.getElementById('day' + (i + 1) + 'Tempt').innerHTML = 'Tempt: ' + Number(data.list[i].main.temp).toFixed(2) + '°';
			}

			for (i = 0; i < 5; i++) {
				document.getElementById('day' + (i + 1) + 'Hum').innerHTML = 'Hum: ' + Number(data.list[i].main.humidity);
			}
			for (i = 0; i < 5; i++) {
				document.getElementById('day' + (i + 1) + 'Wind').innerHTML = 'Wind: ' + Number(data.list[i].wind.speed);
			}
			//------------------------------------------------------------

			//Getting Weather Icons
			for (i = 0; i < 5; i++) {
				document.getElementById('img' + (i + 1)).src = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png';
			}
			//------------------------------------------------------------
			console.log(data);
		})

		.catch(err => alert('Something Went Wrong: Try Checking Your Internet Coneciton'));
}

function DefaultScreen() {
	document.getElementById('cityInput').defaultValue = 'London';
	GetInfo();
}

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
	if (day + d.getDay() > 6) {
		return day + d.getDay() - 7;
	} else {
		return day + d.getDay();
	}
}

for (i = 0; i < 5; i++) {
	document.getElementById('day' + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

var searchHistory = localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : [];

document.querySelector('.search').addEventListener('click', () => {
	searchHistory.push(document.querySelector('.input').value);
	localStorage.searchHistory = JSON.stringify(searchHistory);
});
document.querySelector('.input').addEventListener('focus', () => {
	var data = document.querySelector('datalist#searchdata');
	data.innerHTML = '';
	searchHistory.forEach(search => {
		data.innerHTML = '<option>' + data.innerHTML;
		data.querySelector('option').innerText = search;
	});
});
