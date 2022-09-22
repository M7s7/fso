const Filter = ({ searchTerm, changeFunc }) => (
  <div>
    filter shown with&nbsp;
    <input
      value={searchTerm}
      onChange={changeFunc}
    />
  </div> 
)

export default Filter