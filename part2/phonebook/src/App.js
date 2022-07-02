import axios from 'axios'
import { useEffect, useState } from 'react'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setPerson] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('start');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('success')
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      ...newPerson,
      id: persons.length + 1
    }
    for(let i = 0; i < persons.length; i++) { // Maybe a better way?
      if(persons[i].name === personObject.name) {
        alert(`${newPerson.name} is already added to phonebook`)
        return
      }
    }
    setPersons(persons.concat(personObject))
  }

  const filteredPersons = persons.filter((person) => {
      if(filter==='')
        return person
      else
        return person.name.toLowerCase().includes(filter.toLowerCase())
    }
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={filter} onChange={(event) => setFilter(event.target.value)}/>
      </div>
      <h2>add a new</h2>
      <Form newPerson={newPerson} setPerson={setPerson} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
      {/* <div>debug: {newPerson.name}</div>
      <div>debug: {filter}</div> */}
    </div>
  )
}

export default App