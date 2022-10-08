const Notification = ({ errorMessage }) => {
  if (errorMessage == '') {
    return null
  }

  const errorStyle = {
    color: 'red',
    fontSize: 50,
    background: 'black',
    borderRadius: '4px'
  }
  
  return (
    <div style={errorStyle}>
      {errorMessage}
    </div>
  )
}


export default Notification