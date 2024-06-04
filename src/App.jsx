
import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
const key = '02b8adf13d16c0ee1fce3387b6cd53fe';

function App() {
  const [weather, setWeather] = useState();
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (pos) => {
    console.log(pos);
   setCoords({
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
   });
  }

   useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
   }, []);

   useEffect(() => {
  if (coords) {
   const {lat, lon} = coords;
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${key}`;
   axios.get(url)
      .then(res => {
      const kel = res.data.main.temp;
      const cel = (kel - 273.15).toFixed(2);
      const fah = (cel * 9/5 + 32).toFixed(2);
      setTemp({cel: cel, fah: fah});
      setWeather(res.data);
    })

      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });

    }
   }, [coords]);
   
  
  return (
    <div className='app'>
      {
        isLoading ?
        <figure className='app__img'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" alt="is loading"  />
        </figure>
        :
       <WeatherCard
         weather={weather}
         temp={temp}
        />
      }
    </div>
    
  )
}

export default App;
