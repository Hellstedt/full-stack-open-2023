import { useState } from 'react'

const Button = ({text, handleClick}) => {
    return (
      <button onClick={handleClick}>
        {text}
      </button>
    )
}

const Anecdote = ({text, anecdotesArray, votesArray, arrayIndex}) => {
  if (votesArray[arrayIndex] === 0 && text === 'Anecdote with most votes') {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes has been submitted</p>
      </div>
    )
  }
  return (
    <div>
      <h1>{text}</h1>
      {anecdotesArray[arrayIndex]}
      <br></br>
      <p>has {votesArray[arrayIndex]} votes</p>
      <br></br>
    </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(() => 0))

  //generates random integer, min iclusive max exclusive
  const getRandomInteger = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  //Used by handleNextClick to generate a random integer, min iclusive & max exclusive, to select a random anecdote
  const incrementVotes = (index) => {
    const newVotes = votes.map((element, item) => {
      if (item === index) {
        return element + 1
      } else {
        return element
      }
    })
    setVotes(newVotes)
  }

  //Returns index of anecdote with most votes. Used by 2nd Anecdote component
  const checkMostvotes = () => {
    let index = 0
    let highestVotes = 0
    
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] >= highestVotes) {
        index = i
        highestVotes = votes[i]
      }
    }
    return index
  }

  const handleNextClick = () => setSelected(getRandomInteger(0, anecdotes.length))
  const handleVoteClick = () => incrementVotes(selected)

  return (
    <div>
      <Anecdote text='Anecdote of the day'  anecdotesArray={anecdotes} votesArray={votes} arrayIndex={selected} />
      <Button text='vote' handleClick={handleVoteClick} />
      <Button text='next anecdote' handleClick={handleNextClick} />
      <Anecdote text='Anecdote with most votes' anecdotesArray={anecdotes} votesArray={votes} arrayIndex={checkMostvotes()} />
    </div>
  )
}

export default App