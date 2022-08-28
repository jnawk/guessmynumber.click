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
}

export function randomInRange(minimum: number, maximum: number): number {
  return parseInt((Math.random() * (maximum - minimum) + minimum).toFixed(0))
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.state = {
      target: randomInRange(0, 100),
      showBestGuess: true,
      guesses: 0,
      won: false,
      gameConfig: {
        minimum: 0,
        maximum: 101
      },
      gameState: {
        minimum: 0,
        maximum: 101
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
            guess={guess => {
              guesses = guesses + 1
              if (guess === target) {
                //TODO reset
                this.setState({
                  guesses,
                  gameState: {
                    minimum: guess - 1,
                    maximum: guess + 1
                  }
                })
                console.log("yay")
              } else if (guess < target) {
                this.setState({
                  guesses,
                  gameState: {
                    minimum: guess,
                    maximum: gameState.maximum
                  }
                })
              } else {
                this.setState({
                  guesses,
                  gameState: {
                    minimum: gameState.minimum,
                    maximum: guess
                  }
                })
              }
            }}
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
