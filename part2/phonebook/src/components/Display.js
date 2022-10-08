const Display = ({ persons, handleDelete }) => (
  <div>
    {persons.map(person => 
      <div key={person.id}>
        {person.name} {person.number}&nbsp;
      <button onClick={() => handleDelete(person)}>delete</button>
      </div>
    )}
  </div>
)

export default Display