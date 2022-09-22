const Display = ({ persons }) => (
  <div>
    {persons.map(person => 
      <div key={person.id}>{person.name} {person.number}</div>
    )}
  </div>
)

export default Display