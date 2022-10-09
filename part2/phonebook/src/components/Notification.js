const Notification = ({ errorMessage }) => {
  if (errorMessage == '') {
    return null
  }

  const errorStyle = {
    fontSize: 30,
    borderRadius: '1px',
    padding: '10px',
    color: 'white',
    background: 'black',
  }

  return (
    <div style={errorStyle}>
      {errorMessage}
    </div>
  )
}

export default Notification