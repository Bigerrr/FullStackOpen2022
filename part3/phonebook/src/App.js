import { useEffect, useState } from 'react'
import Form from './components/Form'
import Persons from './components/Persons'
import services from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setPerson] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(0)

  useEffect(() => {
    services
      .getAll()
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
        personObject.id = persons[i].id
        services
          .updateNum(persons[i].id, personObject)
          .then(response => {
            setPersons(persons.map(p => p.id === persons[i].id ? personObject : p))
          })
          .catch(error => {
            setMessageType(1)
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
        return
      }
    }
    services
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setMessageType(0)
        setMessage(`Added ${response.data.name}`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(error => {
        setMessageType(1)
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
  }

  const filteredPersons = persons.filter((person) => {
      if(filter==='')
        return person
      else
        return person.name.toLowerCase().includes(filter.toLowerCase())
    }
  )

  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`))
      services
        .deletePerson(person.id)
        .then(response => {
          console.log('Delete Successful!');
          setPersons(persons.filter(p => p.id !== person.id))
          setMessageType(0)
          setMessage(`Delete ${person.name} successful`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessageType(1)
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={filter} onChange={(event) => setFilter(event.target.value)}/>
      </div>
      <Notification message={message} type={messageType}/>
      <h2>add a new</h2>
      <Form newPerson={newPerson} setPerson={setPerson} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
      {/* <div>debug: {newPerson.name}</div>
      <div>debug: {filter}</div> */}
    </div>
  )
}

export default App