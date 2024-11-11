const input = document.querySelector('#search')
const btn = document.querySelector('.search-btn')
const showdata = document.querySelector('.showdata')

const apikey = '98ba959294b91c68a47267449977f5f6';

const getlocation = (event) => {
    const place = event.target.value;

    if (place) {
        console.log(place)
        btn.addEventListener('click', fetchweather(place))
    }
}

input.addEventListener('change', getlocation)

const fetchweather = async (place) => {
    // console.log(place)
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&q=${place}`)
        if (!res.ok) { throw new Error("Location not found!") }
        let data = await res.json();
        console.log(data)
        displaydata(data);  
    }
    catch (err) {
        console.log(err.message)
        showdata.innerHTML = `<p>${err.message}</p>`;

    }
}

function displaydata(data){
    showdata.innerHTML = `
        <p>Location    : ${data.name}</p>
        <p>Temperature : ${(data.main.temp - 273.15).toFixed(0)} &#176C</p>
        <p>Weather     : ${data.weather[0].description}</p>
        <p>Humidity    : ${data.main.humidity}%</p>
        `;  
}

