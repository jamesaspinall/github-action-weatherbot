require('dotenv').config()
const fetch = require('node-fetch')

weatherToken = process.env.WEATHER_API_TOKEN
webhook = process.env.SLACK_WEBHOOK

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
weatherURL.searchParams.set("zip", "2024,au" )
weatherURL.searchParams.set("APPID", weatherToken )
weatherURL.searchParams.set("units", "metric" )

const getWeatherData = async() => {
    const response = await fetch(weatherURL.toString())
    const data = await response.json()
    return data 
}

const generateWeatherMessage = weatherData => `Good Morning! The weather in ${weatherData.name} will be ${weatherData.weather[0].main} with, ${weatherData.weather[0].description}, a high of ${weatherData.main.temp_max.toFixed(0)}°C and a low of ${weatherData.main.temp_min.toFixed(0)}°C.`

const main = async() => {
   const weatherData =  await getWeatherData()
   const weatherString = generateWeatherMessage(weatherData)
   const message = {"text": weatherString}
   console.log(message)
   fetch(webhook, {
        method: 'post',
        body:    JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => console.log(res))
   
}


main()