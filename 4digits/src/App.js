//This code draws heavily in structure from the hangman lecture notes
//https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/04-react-intro/notes.md
import { useState } from 'react';
import { lives_left, new_secret, validate_guess, guesses_and_results } from './game';

import './App.css';

function App() {
  const [secret, _setSecret] = useState(new_secret());
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");

  let lives = lives_left(guesses);

  function updateGuess(ev) {
    let text = ev.target.value;
    if (text.length > 4) {
      text = text.slice(0, 4);
    }
    setGuess(text);
  }

  function makeGuess() {
    if (!guesses.includes(guess) && validate_guess(guess)) {
      guesses.push(guess);
      setGuess("");
    }
  }


  function keypress(ev) {
    if (ev.key == "Enter") {
      makeGuess();
    }
  }

  if (guesses.includes(secret)) {
    return (
      <div className="App">
        <h1>Game Won</h1>
        <h1>Secret: {secret}</h1>
        <p>
          <button onClick={() => { setGuesses([]); _setSecret(new_secret()); }}>
            Reset
          </button>
        </p>
      </div>
    );
  }

  if (lives <= 0) {
    return (
      <div className="App">
        <h1>Game Over</h1>
        <h1>Secret: {secret}</h1>
        <p>
          <button onClick={() => { setGuesses([]); _setSecret(new_secret()); }}>
            Reset
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Guesses Left: {lives}</h1>
      <p>
        <input type="text"
          value={guess}
          onChange={updateGuess}
          onKeyPress={keypress} />
        <button onClick={makeGuess}>
          Guess
        </button>
      </p>
      <table>
        <tr>
          <th>Guess</th>
          <th>Result</th>
        </tr>
        {
          guesses_and_results(secret, guesses).map((elem => <tr><td>{elem.guess}</td><td>{elem.results}</td></tr>))
        }
      </table>
      <p>
        <button onClick={() => { setGuesses([]); _setSecret(new_secret()); }}>
          Reset
        </button>
      </p>
    </div>
  );
}

export default App;
