import React from "react"
import { GameRange } from "./App"

export interface GameStatusProps {
    guesses: number
    gameState: GameRange
    showBestGuess: boolean
    setShowBestGuess: {(value: boolean): void}
}

interface GameStatusState {
    
}

export function getMidpoint(gameState: GameRange): string | number {
    const range = gameState.maximum - gameState.minimum
    let midpoint: string | number = range / 2 + gameState.minimum
    if (range % 2 === 1) {
        midpoint = "" + ((range - 1) / 2 + gameState.minimum) + " or " + ((range + 1) / 2 + gameState.minimum)
    }
    return midpoint
}

export class GameStatus extends React.Component<GameStatusProps, GameStatusState> {
    constructor(props: GameStatusProps) {
        super(props)
    }
     
    render(): React.ReactNode {
        const {guesses, gameState, showBestGuess, setShowBestGuess} = this.props

        const minimum = gameState.minimum
        const maximum = gameState.maximum
        let midPoint: string | number
        
        if(showBestGuess) {
            midPoint = getMidpoint(gameState) + " (click to hide)"
        } else {
            midPoint = "?? (click to show)"
        }
        return <>
            <div>Guesses: {guesses}</div>
            <div>Minimum: {minimum}</div>
            <div>Maximum: {maximum}</div>
            <div>Best Guess: <span onClick={() => { setShowBestGuess(!showBestGuess) }}>{midPoint}</span></div>
        </>
    }
}

