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
}

function randomInRange(minimum: number, maximum: number): number {
  return parseInt((Math.random() * (maximum - minimum - 2 ) + minimum + 1).toFixed(0))
}

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props)

    this.state = {
      target: randomInRange(0, 100),
      showBestGuess: true,
      guesses: 0,
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
    const {gameConfig, gameState, target, showBestGuess} = this.state
    let {guesses} = this.state
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
