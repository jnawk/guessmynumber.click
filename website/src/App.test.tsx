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

test('when the right element is clicked, it\'s the only one displayed', () => {
  render(
    <App 
      target={42} 
      showConfetti={false} 
    />
  );

  act(() => {
    document.getElementById("cell42")?.click()
  })
  expect(document.getElementById("cell41")).toBeDefined()
  expect(document.getElementById("cell41")?.getElementsByTagName("span").length).toBe(0)
  expect(document.getElementById("cell43")).toBeDefined()
  expect(document.getElementById("cell43")?.getElementsByTagName("span").length).toBe(0)
});

test('clicking the minimum when it\'s not the target removes it', () => {
  render(
    <App 
      target={42} 
    />
  );

  act(() => {
    document.getElementById("cell1")?.click()
  })

  const minimumDisplay = screen.getByText(/Minimum: 2/i);
  expect(minimumDisplay).toBeInTheDocument();

});

test('clicking the maximum when it\'s not the target removes it', () => {
  render(
    <App 
      target={42} 
    />
  );

  act(() => {
    document.getElementById("cell100")?.click()
  })

  const minimumDisplay = screen.getByText(/Maximum: 99/i);
  expect(minimumDisplay).toBeInTheDocument();

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

test('minimum is present', () => {
  render(
    <App gameConfig={{minimum: 0, maximum: 100}}/>
  );

  expect(document.getElementById("cell1")).toBeDefined()
  expect(document.getElementById("cell1")?.getElementsByTagName("span").length).toBe(1)
})

test('maximum is present', () => {
  render(
    <App gameConfig={{minimum: 0, maximum: 100}}/>
  );

  expect(document.getElementById("cell100")).toBeDefined()
  expect(document.getElementById("cell100")?.getElementsByTagName("span").length).toBe(1)
})

test('minimum is winnable', () => {
  let won = false
  let guessCount
  render(
    <App
      target={1} 
      win={(guesses: number) => {
        won = true
        guessCount = guesses
      }}
      showConfetti={false} 
      gameConfig={{minimum: 0, maximum: 100}}
    />
  );

  act(() => {
    document.getElementById("cell1")?.click()
  })
  expect(won).toBe(true)
  expect(guessCount).toBe(1)
})

test('maximum is winnable', () => {
  let won = false
  let guessCount
  render(
    <App
      target={100} 
      win={(guesses: number) => {
        won = true
        guessCount = guesses
      }}
      showConfetti={false} 
      gameConfig={{minimum: 0, maximum: 100}}
    />
  );

  act(() => {
    document.getElementById("cell100")?.click()
  })
  expect(won).toBe(true)
  expect(guessCount).toBe(1)
})

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
  expect(minSeen).toBe(true)
  expect(maxSeen).toBe(true)
  if(minSeen && maxSeen) {
    return
  }
  const message = "It didn't return such a number after 10000 goes - saw min: " + minSeen + ", saw max: " + maxSeen
  throw new Error(message)
})
