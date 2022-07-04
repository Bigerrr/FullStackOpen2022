import services from "../services/persons"

const Person = ({ person, handleDelete}) => {

  return (
    <>
      <p>{person.name}{" "}{person.number}</p>
      <button onClick={() => handleDelete(person)}>delete</button>
    </>
  )
}

export default Person