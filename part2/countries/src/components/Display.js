import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ( {countries} ) => {
  const length = countries.length
  return (
    <div>
      {length == 1 && <Profile country={countries[0]} />}
      {length > 1 && length <= 10 && <MultiList countries={countries} />}
      {length > 10 && <div>Too many matches, specify another filter</div>}
    </div>
  )
}

const Profile = ( {country} ) => {
  const langArray = Object.values(country.languages)
  const api_key = process.env.REACT_APP_API_KEY
  const [cityTemp, changeTemp] = useState()
  const [cityWind, changeWind] = useState()
  const [iconID, changeIconID] = useState()

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then((response) => {
        changeTemp(response.data.main.temp)
        changeWind(response.data.wind.speed)
        changeIconID(response.data.weather[0].icon)
        
      })
  })

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div><br />

      <b>languages:</b>
        <ul>
          {langArray.map((language) => <li key={language}>{(language)}</li>)}
        </ul>

        <img src={country.flags.png} alt="Flag of country"/>

      <div>
        <h1>Weather in {country.capital}</h1>
          <div>temperature {cityTemp} Celcius</div>
          {console.log(iconID)}
          <img src={`http://openweathermap.org/img/wn/${iconID}@2x.png`} />
          <div>wind {cityWind} m/s</div> 
      </div>
    </div>
  )
}

const MultiList = ( {countries} ) => {
  const [showCountry, addCountry] = useState(new Set())
  
  return (
    <div>
      {countries.map((country) => 
        <div key={country.name.common}>
          {country.name.common}
          {showCountry.has(country.name.common) == true && <Profile country={country} />}

          <button onClick={() => 
            {
              const newSet = new Set(showCountry)
              newSet.add(country.name.common)
              addCountry(newSet)
              console.log(showCountry);
            }
          }>
            show
          </button>
        </div>
      
      )}
    </div>
  )
}

export default Display
