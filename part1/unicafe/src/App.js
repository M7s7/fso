import { useState } from 'react'

const Header = props => (
  <h1>{props.title}</h1> 
)

const Button = ({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
)

const StatisticLine = ({ label, value }) => (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
)

const Statistics = ( {good, neutral, bad, total} ) => {
  if (total == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine label="good" value={good} />
          <StatisticLine label="neutral" value={neutral} />
          <StatisticLine label="bad" value={bad} />
          <StatisticLine label="all" value={total} />
          <StatisticLine label="average" value={(good - bad) / total} />
          <StatisticLine label="positive" value={(good / total) * 100 + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)
  return (
    <div>
      <Header title="give feedback" />
      <Button onClick={addGood} label="good" />
      <Button onClick={addNeutral} label="neutral" />
      <Button onClick={addBad} label="bad" />

      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App