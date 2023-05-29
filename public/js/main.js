// import * as dotenv from '../../dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()
// import express from '../../express'
// require('../../dotenv').config()

// const api_key = require("../../src/app")
// console.log(api_key);

const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('cityName')
const city_name = document.getElementById('city_name')
const temp_real_val = document.getElementById('temp_real_val')
const temp_status = document.getElementById('temp_status')
const datahide = document.querySelector('.middle_layer ')
// console.log(process.env);
const getInfo = async (event) => {
    event.preventDefault()
    const cityVal = cityName.value

    if (cityVal.trim() === '') {
        city_name.innerText = "Please enter a city name to search"
        datahide.classList.add('data_hide')
    } else {
        try {

            const temp_api = await fetch('http://localhost:8000/api')
            const third = await temp_api.json()
            console.log(third.api);

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${third.api}`
            const response = await fetch(url)
            const data = await response.json()
            const arrData = [data]

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`
            temp_real_val.innerText = arrData[0].main.temp
            // temp_status.innerText = arrData[0].weather[0].main

            const tempMood = arrData[0].weather[0].main

            // condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }

            datahide.classList.remove('data_hide')

        }
        catch (err) {
            console.log(err);
            city_name.innerText = "Please enter a valid city name"
            datahide.classList.add('data_hide')

        }
    }

}

submitBtn.addEventListener('click', getInfo)