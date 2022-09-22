import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])

  // States
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName) !== undefined) {
      window.alert(`${newName} is already added to phonebook`)
    }
    
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: newName,
      }
      
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNewPerson = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearchTerm(event.target.value)

  // Effect hook
  useEffect(() => {
    console.log("Hi");
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  // Search helper function
  const checkMatch = (person) => {
    const name = person.name.toLowerCase()

    return (
      name.includes(searchTerm.toLowerCase())
    )
  }
    

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        searchTerm={searchTerm}
        changeFunc={handleSearch}
      />

      <h1>add a new</h1>
        <Form 
          newName={newName} 
          newNumber={newNumber}
          submitFunc={addPerson}
          func1={handleNewPerson} 
          func2={handleNewNumber}
        />

      <h1>Numbers</h1>
        <Display 
          persons={persons.filter(checkMatch)}       
        />
    </div>
  )
}


export default App