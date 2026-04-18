import Search from './Components/Search';
import Result from './Components/Result';
import './index.css';
import { useState } from 'react';
import axios from 'axios';
// import { data } from 'autoprefixer';

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const [history, setHistory] = useState([]);

  const changeSearch = (value) => {
    setSearch(value);
  }

  const searchWeatherHandler = () => {
    if (search !== "") {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=1eb5ff3259a59bf03653144c283a5c31&units=metric`)
        .then(
          (response) => {
            if (history.indexOf(search) == -1) {
              setHistory(
                [
                  ...history,
                  search
                ]
              )
            }
            setWeather(response.data)
          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
    }
  }

  const historySearchHandler = async (data) => {
    setSearch(data)
    if (data !== "") {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=1eb5ff3259a59bf03653144c283a5c31&units=metric`)
        .then(
          (response) => {
            if (history.indexOf(search) == -1) {
              setHistory(
                [
                  ...history,
                  search
                ]
              )
            }
            setWeather(response.data)
          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
    }
  }

  return (
    <div className='max-w[1240px] mx-auto mt-2 p-3'>
      <Search searchData={search} eventHandler={changeSearch} searchWeather={searchWeatherHandler} />
      <Result weatherData={weather} historyData={history} historySearch={historySearchHandler} />
    </div>
  );
}

export default App;