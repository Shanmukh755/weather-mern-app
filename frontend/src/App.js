import './App.css'
import {useState} from 'react'
import { IoSearch } from "react-icons/io5";

const App = ()=>{
  const [city, setCity] = useState('')
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: 0,
    description: 'weather condition',
    humidity: 0,
    windSpeed: 0,
    city: 'city name'
  })
  const [isCityNotFound, setIsCityNotFound] = useState(false)
  let weatherImg
  switch(weatherInfo.description){
    case 'clouds':
      weatherImg = '/cloud.png'
      break
    case 'clear':
      weatherImg = '/clear.png' 
      break 
    case 'rain':
      weatherImg = '/rain.png'
      break
    case 'snow':
      weatherImg = './snow.png' 
      break   
    case 'mist':
      weatherImg = './drizzle.png' 
      break 
    default:
      weatherImg = './cloud.png' 

  }
  const onClickGo = async () => {
    const url = "https://weather-app-chi-one-33.vercel.app/weather";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city })
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            const formatedData = {
              temperature: data.temperature,
              humidity: data.humidity,
              city: data.city,
              description: data.description,
              windSpeed: data.windSpeed,
              status: data.status
            }
            setWeatherInfo(formatedData)
            setCity('');
            setIsCityNotFound(false)
        } else {
          console.log(response)
          setIsCityNotFound(true)
        }
        
    } catch (error) {
        console.error('Fetch error:', error);
    }
  };
  console.log(weatherInfo)
  const tempIn = weatherInfo.temperature-273
  const templInCel = tempIn.toFixed(1)

  const renderSuccess = () => {
    return(
      <div>
        <div className='weather-temp-cont'>
          <img src={weatherImg} className='weather-img' alt='weather' />
          <p className='des1'>{weatherInfo.description}</p>
          <h1 className='temp'>{templInCel}
            <span className='mini'>o</span>c
          </h1>
          <h1 className='city'>{weatherInfo.city}</h1>
        </div>
        <div className='weather-data-cont'>
          <div className='humity-cont'>
            <img src='humidity.png' className='air-img' alt='humidity' />
            <div>
              <h1 className='humidity'>{weatherInfo.humidity}%</h1>
              <p className='des'>Humidity</p>
            </div>
          </div>
          <div className='humity-cont'>
            <img src='wind.png' className='air-img' alt='humidity' />
            <div>
              <h1 className='humidity'>{weatherInfo.windSpeed} km/h</h1>
              <p className='des'>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderFailure = () => {
    return(
      <div className='failure-section'>
        <img src='https://cdni.iconscout.com/illustration/premium/thumb/error-8694026-6983265.png' className='error-img' alt='error' />
        <p className='error-msg'>City Not Found</p>
      </div>
    )
  }

  return(
    <div className='bg-container'>
      <h1 className='main-head'>Weather App</h1>
      <div className='card-container'>
        <div className='input-cont'>
          <input className='input' type='text' placeholder="Enter City Name" value={city} onChange={(e)=>(setCity(e.target.value))}/>
          <IoSearch className='search-icon' onClick={onClickGo} type="button" />
        </div>
        {isCityNotFound ? renderFailure() : renderSuccess()}
      </div>
    </div>
  )
}

//main.temp main.humidity name weather[0].description wind.speed 

export default App