const Form = ({newPerson, setPerson, addPerson}) => {
    
    return (
        <div>
            <form>
                <div>
                    name: <input value={newPerson.name} onChange={(event) => {setPerson({...newPerson, name: event.target.value})}} /><br />
                    number: <input value={newPerson.number} onChange={(event) => {setPerson({...newPerson, number: event.target.value})}} />
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>add</button>
                </div>
            </form>
        </div>
    )
}

export default Form