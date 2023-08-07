(function ($, document, window) {

    $(document).ready(function () {

        // Cloning main navigation for mobile menu
        $(".mobile-navigation").append($(".main-navigation .menu").clone());

        // Mobile menu toggle 
        $(".menu-toggle").click(function () {
            $(".mobile-navigation").slideToggle();
        });
    });

    $(window).load(function () {

    });

})(jQuery, document, window);

// DEFAULT CONFIGURATIONS
const cityForm = document.querySelector('.find-location');
const defaultCity = "Mumbai";
const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const imagePath = "images/icons/";

const updateUI = (data) => {
    const days = document.getElementsByClassName('day');
    const date = document.getElementsByClassName('date'); // returns an array
    const location = document.getElementsByClassName('location'); // returns an array
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const windDegree = document.getElementById('wind-degree');
    const temps = document.getElementsByClassName('temp');
    const icon = document.getElementsByClassName('weather-icon');

    location[0].innerHTML = data.city.name;
    humidity.innerHTML = data.list[0].main.humidity + "%";

    // 1m/sec = 3.6km/hr so we need to multiply m/sec to 3.6
    windSpeed.innerHTML = Math.round((data.list[0].wind.speed * 3.6 * 10)) / 10 + "km/hr";
    windDegree.innerHTML = data.list[0].wind.deg + "<sup>o</sup>";

    const todaysDate = new Date(data.list[0].dt_txt);

    const todaysMonth = monthsName[todaysDate.getMonth()];
    date[0].innerHTML = todaysDate.getDate() + " " + todaysMonth;

    const todaysDayNumber = todaysDate.getDay();

    let i = 0;
    let j = 0;
    for (let element of days) {
        const dayName = daysName[(todaysDayNumber + i) % 7]; // mod so as to rotate between the array as week = 7 days
        element.innerHTML = dayName;

        const currentTemp = Math.round((data.list[j].main.temp));
        temps[i].innerHTML = currentTemp + "<sup>o</sup>C";

        // Setting image icon
        icon.src = imagePath + data.list[j].weather[0].icon + ".svg";

        ++i
        j = j + 8; // API is providing data per 3 hour so 24hours per day divided by 3 gives 8
    }

    /*for(i=0 i<days.length; i++){
    const dayName = daysName[(todaysDayNumber + i) % 7];
    days[i].innerHTML = dayName
    }*/ // Works Same as For-of loop
}

// Adding submit Event on form
cityForm.addEventListener('submit', e => {
    e.preventDefault();
    let cityName = cityForm.city.value.trim();

    if (cityName === "") {
        cityName = defaultCity;
    }
    getForecast(cityName)
        .then(data => updateUI(data))
        .catch(err => alert(err));
});
