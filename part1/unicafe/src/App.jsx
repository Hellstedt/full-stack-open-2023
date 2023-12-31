import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
    {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({goodClicks, neutralClicks, badClicks, allClicks}) => {

  const weight = {
    good: 1,
    neutral: 0,
    bad: -1
  }

  const averageScore = () => ((goodClicks * weight.good) + (neutralClicks * weight.neutral) + (badClicks * weight.bad)) / allClicks

  const percentagePositive = () => (goodClicks / allClicks) * 100

  if (allClicks < 1) {
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
          <StatisticLine text='good' value={goodClicks} />
          <StatisticLine text='neutral' value={neutralClicks} />
          <StatisticLine text='bad' value={badClicks} />
          <StatisticLine text='all' value={allClicks} />
          <StatisticLine text='average' value={averageScore()} />
          <StatisticLine text='positive' value={percentagePositive()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAllFeedback] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAllFeedback(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAllFeedback(updatedNeutral + good + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAllFeedback(updatedBad + neutral + good)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics goodClicks={good} neutralClicks={neutral} badClicks={bad} allClicks={allFeedback}/>
    </div>
  )
}

export default App