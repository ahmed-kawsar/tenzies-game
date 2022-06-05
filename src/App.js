import React, { useEffect, useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';

const App = () => {
  const generateNewDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  };

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log('You won!');
    }
  }, [dice]);

  const rollDice = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  return (
    <div>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">
          {dice.map((die) => (
            <Die
              value={die.value}
              key={die.id}
              isHeld={die.isHeld}
              holdDice={() => holdDice(die.id)}
            />
          ))}
        </div>
        <button className="dice-btn" onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </main>
      <footer>
        {' '}
        Copyright &copy; 2022, all right reserved by Kawsar Ahmed
      </footer>
    </div>
  );
};

export default App;
