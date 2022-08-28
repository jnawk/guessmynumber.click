import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { randomInRange } from './App';
import { act } from 'react-dom/test-utils';

test('game is won when the right element is clicked', () => {
  let won = false
  let guessCount
  render(
    <App 
      target={42} 
      win={(guesses: number) => {
        won = true
        guessCount = guesses
      }}
      showConfetti={false} 
    />
  );

  act(() => {
    document.getElementById("cell42")?.click()
  })
  expect(won).toBe(true)
  expect(guessCount).toBe(1)
});

test('game is won when the right number is the last option', () => {
  let won = false
  let guessCount
  render(
    <App 
      target={42} 
      win={(guesses: number) => {
        won = true
        guessCount = guesses
      }}
      showConfetti={false} 
    />
  );

  act(() => {
    document.getElementById("cell41")?.click()
  })
  act(() => {
    document.getElementById("cell43")?.click()
  })
  expect(won).toBe(true)
  expect(guessCount).toBe(3)
});

test('game is not won when the right number is not the only option - scenario 1', () => {
  let won = false
  let guessCount
  render(
    <App 
      target={42} 
      win={(guesses: number) => {
        won = true
        guessCount = guesses
      }}
      showConfetti={false} 
    />
  );

  act(() => {
    document.getElementById("cell41")?.click()
  })
  act(() => {
    document.getElementById("cell44")?.click()
  })
  expect(won).toBe(false)
});

test('game is not won when the right number is not the only option - scenario 2', () => {
  let won = false
  let guessCount
  render(
    <App 
      target={42} 
      win={(guesses: number) => {
        won = true
        guessCount = guesses
      }}
      showConfetti={false} 
    />
  );

  act(() => {
    document.getElementById("cell43")?.click()
  })
  act(() => {
    document.getElementById("cell40")?.click()
  })
  expect(won).toBe(false)
});

test('Random number generator returns valid values', () => {
  let triesLeft = 1000000
  let minSeen = false, maxSeen = false
  const min = 0, max = 100
  while(triesLeft > 0) {
      triesLeft = triesLeft - 1
      const val = randomInRange(min, max)
      if(val <= min || val > max) {
        throw new Error("Saw value out of range")
      }
      if (val === min + 1) {
        minSeen = true
      } else if(val === max) {
        maxSeen = true
      } 
  }
  if(minSeen && maxSeen) {
    return
  }
  const message = "It didn't return such a number after 10000 goes - saw min: " + minSeen + ", saw max: " + maxSeen
  throw new Error(message)
})