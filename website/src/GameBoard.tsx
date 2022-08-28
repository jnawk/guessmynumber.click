import React from "react"
import {GameRange} from './App'
import './App.css'
import Confetti from 'react-confetti'

function range(
  start: number, 
  stop: number, 
  step?: number
): Array<number> {
  return Array.from(
    {length: (stop - start)},
    (_, i) => start + i * (step || 1)
  )
}

export interface GameBoardProps {
    gameConfig: GameRange
    gameState: GameRange
    guess: {(guess: number): void}
    won: boolean,
    showConfetti?: boolean
}

interface GameBoardState {
    
}

function normalize(scale: number, value: number, minimum: number, maximum: number): number {
    return parseInt((scale * (value - minimum) / (maximum - minimum)).toFixed(0))
}

export class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
    constructor(props: GameBoardProps) {
        super(props)
    }
     
    render(): React.ReactNode {
        const {gameConfig, gameState, guess, won, showConfetti} = this.props
        const rowStarts = range(gameConfig.minimum, gameConfig.maximum, 10)
        const rows = rowStarts.map(rowStart => { 
            const rowEnd = Math.min(gameConfig.maximum, rowStart + 10)
            return range(rowStart + 1, rowEnd + 1)
        }).filter(x => x.length !== 0)

        let confetti = undefined
        if(won && showConfetti !== false) {
            confetti = <Confetti recycle={false}/>
        }

        return <>   
            {confetti}
            <table><tbody>
                {rows.map(row => {
                    return <tr key={"row" + row[0]}>
                        {row.map(value => {
                            let cellContent, click
                            let style: React.CSSProperties | undefined

                            const median = (gameConfig.maximum - gameConfig.minimum) / 2 + gameConfig.minimum
                            const lq = (median - gameConfig.minimum) / 2 + gameConfig.minimum
                            const uq = (gameConfig.maximum - median) / 2 + median

                            let red: number, blue: number, green: number
                            if(value < lq) {
                                red = 0xff
                                green = normalize(0xff, value, gameConfig.minimum, lq)
                                blue = 0
                            } else if (value < uq) {
                                green = 0xff
                                if (value < median) {
                                    red = 0xff - normalize(0xff, value, lq, median)
                                    blue = 0
                                } else {
                                    red = 0
                                    blue = normalize(0xff, value, median, uq)
                                }
                            } else {
                                red = 0
                                green = 0xff - normalize(0xff, value, uq, gameConfig.maximum)
                                blue = 0xff
                            }
                            
                            if(value <= gameState.minimum || value >= gameState.maximum) {
                                cellContent = <>&nbsp;</>
                                click = undefined
                                style = undefined
                            } else {    
                                cellContent = <span>{value}</span>
                                click = () => guess(value)
                                style = {
                                    backgroundColor: "rgb(" + red + "," + green + "," + blue + ")",
                                    textShadow: "0px 0px 15px white"
                                }
                            }

                            return (
                                <td 
                                    onClick={click} 
                                    key={"cell" + value}
                                    style={style}       
                                >
                                    {cellContent}
                                </td>
                            )
                        })}
                    </tr>
                })}
            </tbody></table>
        </>
    }
}
