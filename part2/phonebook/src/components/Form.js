const Form = ({ newName, newNumber, submitFunc, func1, func2 }) => (
  <div>
    <form onSubmit={submitFunc}>
      name:&nbsp;
        <input 
          value={newName}
          onChange={func1}
        />
      <div>
        number:&nbsp;
        <input
          value={newNumber}
          onChange={func2}
        />
      </div>
      <div>
        <button type="submit">
          add
        </button>
      </div>
    </form>
  </div>
)

export default Form