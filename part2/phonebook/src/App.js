import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Display from './components/Display'
import Filter from './components/Filter'
import personService from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  // States
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setMessage] = useState('')

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault()
    const targetPerson = persons.find((person) => person.name === newName)

    // Replace number (existing person, new number)
    if (targetPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
          id: targetPerson.id
        }

        // Database service and Notifications
        personService.changeNumber(targetPerson.id, updatedPerson)
          .then(setMessage(`${newName}'s number has been changed`))
          .catch(error => setMessage(`${newName}'s information has already been deleted from server`))

        // State change
        const index = persons.indexOf(targetPerson)
        const newList = [...persons]
        newList.splice(index, 1, updatedPerson)
        setPersons(newList)
      }
    }
    
    // New person new number
    else {     
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Date.now()
      }

      // Notification
      setMessage(`Added ${newName}`)

      // Add to database
      personService.create(newPerson)
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }

    // Remove notification
    setTimeout(() => {
      setMessage('')}
    , 2000)
  }

  const handleNewPerson = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearchTerm(event.target.value)
  const handleDelete = person => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(setMessage(`Deleted ${person.name}`))
        .catch(error => setMessage(`${person.name} has already been deleted from server`))
      setPersons(persons.filter(x => x.id != person.id))
    }

    // Remove notification
    setTimeout(() => {
      setMessage('')}
    , 2000)
  }


  // Effect hook
  useEffect(() => {
    personService.getAll().then(response => setPersons(response))
  }, [])

  // Search helper function
  const checkMatch = (person) => {
    const name = person.name.toLowerCase()
    return name.includes(searchTerm.toLowerCase())
  }
    
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        errorMessage={errorMessage}/>
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
          handleDelete={handleDelete}   
        />
    </div>
  )
}

export default App