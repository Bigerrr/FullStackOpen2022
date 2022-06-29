import { useState } from 'react'

const Button = ({ clickHandle, text }) => (
  <button onClick={clickHandle}>{text}</button>
)

const StatisticLine = ({text, value, postfix}) => <p>{text}{" "}{value}{postfix}</p>

const Statistics = ({good, neutral, bad, average}) => {
  if(good === 0 && neutral === 0 && bad === 0)
    return (
      <p>No feedback given</p>
    )
  return (
    <>
    <h1>statistics</h1>
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{good+neutral+bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positve</td>
          <td>{good / (good + neutral + bad) * 100}%</td>
        </tr>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = () => (good * 1 + bad * -1) / (good + neutral + bad)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' clickHandle={() => setGood(good + 1)} />
      <Button text='neutral' clickHandle={() => setNeutral(neutral + 1)} />
      <Button text='bad' clickHandle={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} average={average()} />
    </div>
  )
}

export default App