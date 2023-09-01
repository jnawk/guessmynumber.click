import { render, screen } from '@testing-library/react';
import {GameStatus, getMidpoint} from './GameStatus';

test('midpoint 1-2', () => {
  const midpoint = getMidpoint({minimum: 1, maximum: 2})
  expect(midpoint).toBe("1 or 2")
});

test('midpoint 1-3', () => {
  const midpoint = getMidpoint({minimum: 1, maximum: 3})
  expect(midpoint).toBe(2)
});

test('minimum is corretly rendered', () => {
  render(
    <GameStatus 
      gameState={{minimum: 1, maximum: 2}}
      guesses={1} showBestGuess={false} setShowBestGuess={()=>{}}
    />
  );
  const minimumDisplay = screen.getByText(/Minimum: 1/i);
  expect(minimumDisplay).toBeInTheDocument();
})
