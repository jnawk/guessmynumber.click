import React from "react"

export interface GameControlsProps {
    newGame: {(): void}
}

interface GameControlsState {
    
}

export class GameControls extends React.Component<GameControlsProps, GameControlsState> {
    constructor(props: GameControlsProps) {
        super(props)
    }
     
    render(): React.ReactNode {
        const {newGame} = this.props
        return <>
            <button onClick={() => newGame()}>New Game</button>
        </>
    }
}

