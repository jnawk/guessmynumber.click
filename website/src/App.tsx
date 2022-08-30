import React from 'react';
import './App.css';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { GameStatus } from './GameStatus';


export interface GameRange {
  minimum: number
  maximum: number
}

interface AppState {
  target: number
  guesses: number
  gameConfig: GameRange
  gameState: GameRange
  showBestGuess: boolean
  won: boolean
}

interface AppProps {
  target?: number
  win?: {(guesses: number): void}
  showConfetti?: boolean
  gameConfig?: GameRange
}

export function randomInRange(minimum: number, maximum: number): number {
  return parseInt((Math.random() * (maximum - minimum - 1) + minimum + 1).toFixed(0))
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    const {target, gameConfig} = this.props
    this.state = {
      target: target || randomInRange(0, 100),
      showBestGuess: false,
      guesses: 0,
      won: false,
      gameConfig: gameConfig || {
        minimum: 0,
        maximum: 100
      },
      gameState: {
        minimum: 0,
        maximum: 100
      }
    }
  }

  newGame() {
    const {gameConfig} = this.state
    this.setState({
      target: randomInRange(gameConfig.minimum, gameConfig.maximum),
      guesses: 0,
      won: false,
      gameState: {
        minimum: gameConfig.minimum,
        maximum: gameConfig.maximum
      }
    })
  }

  setShowBestGuess(show: boolean) {
    this.setState({showBestGuess: show})
  } 

  guess(guess: number) {
    const {win} = this.props
    const {gameState, target} = this.state
    let {guesses, won} = this.state

    guesses = guesses + 1
    if (guess === target) {
      won = true
      this.setState({
        guesses,
        won,
        gameState: {
          minimum: guess - 1,
          maximum: guess + 1
        }
      })
    } else {
      if (guess < target) {                
        if(gameState.maximum == target + 1 && guess == target - 1) {
          guesses = guesses + 1
          won = true
        }
        this.setState({
          guesses,
          won,
          gameState: {
            minimum: guess,
            maximum: gameState.maximum
          }
        })
      } else {
        if(guess == target + 1 && gameState.minimum == target - 1) {
          guesses = guesses + 1
          won = true
        }
        this.setState({
          guesses,
          won,
          gameState: {
            minimum: gameState.minimum,
            maximum: guess
          }
        })
      }
    }
    if(won && win) {
      win(guesses)
    }
  }

  render() {
    const {gameConfig, gameState, won, showBestGuess} = this.state
    let {showConfetti} = this.props
    let {guesses} = this.state
    if (showConfetti === undefined) {
      showConfetti = true 
    }
    return (
      <div className="App">
        <div>
          <GameBoard 
            gameConfig={gameConfig} 
            gameState={gameState}
            guess={guess => this.guess(guess)}
            won={won}
            showConfetti={showConfetti}
          />
        </div>
        <div>
          <GameControls newGame={() => this.newGame()}/>
          <GameStatus 
            guesses={guesses} 
            gameState={gameState} 
            showBestGuess={showBestGuess} 
            setShowBestGuess={(value: boolean) => {this.setShowBestGuess(value)}}
          />
        </div>
      </div>
    );
  }
}

export default App;
