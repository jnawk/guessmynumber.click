import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { randomInRange } from './App';

test('renders learn react link', () => {
  render(<App />);
});

test('Random number generator returns valid values', () => {
  let triesLeft = 1000000
  let minSeen = false, maxSeen = false
  const min = 0, max = 100
  while(triesLeft > 0) {
      triesLeft = triesLeft - 1
      const val = randomInRange(min, max)
      if(val < min || val > max) {
        throw new Error("Saw value out of range")
      }
      if (val === 0) {
        minSeen = true
      } else if(val === 10) {
        maxSeen = true
      } 
  }
  if(minSeen && maxSeen) {
    return
  }
  const message = "It didn't return such a number after 10000 goes - saw min: " + minSeen + ", saw max: " + maxSeen
  throw new Error(message)
})