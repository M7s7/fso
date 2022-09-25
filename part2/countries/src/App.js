import { useState, useEffect } from 'react'
import './App.css';
import Display from './components/Display'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [userInput, setInput] = useState('')

  // Event handlers
  const handleInput = (event) => {
    setInput(event.target.value)
  }

  // Filter function
  const searchFilter = (country) => {
    const countryName = country.name.common.toLowerCase()

    return (
      countryName.includes(userInput.toLowerCase())
    )
  }

  // Side effect - API Call
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <p>debug: {userInput}</p>
      find countries&nbsp;
      <input 
        onChange={handleInput}
        value={userInput}
      />
    
    <Display countries={countries.filter(searchFilter)} />
  
    </>
  );
}

export default App;
