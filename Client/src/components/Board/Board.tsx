import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import BlackPawn from '../../assets/BlackPawn.svg'
import WhitePawn from '../../assets/WhitePawn.svg'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './Board.css'

type Piece = 'W' | 'B' | ''
type Board = Piece[][]

const initialBoard: Piece[][] = [
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['' , '' , '' , '' , '' , '' , '' , '' ],
  ['' , '' , '' , '' , '' , '' , '' , '' ],
  ['' , '' , '' , '' , '' , '' , '' , '' ],
  ['' , '' , '' , '' , '' , '' , '' , '' ],
  ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
  ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
]

type Field = [number, number] | undefined

type GameState = {
  board: Board,
  turn: 'B' | 'W'
}

const Board = () => {
  const [board, setBoard] = useState<Board>(initialBoard)
  const [selectedField, setSelectedField] = useState<Field>(undefined)

  const fieldOnClick = (col: number, row: number) => {
    if (selectedField === undefined)
        setSelectedField([col, row])
    else {
        const [sCol, sRow] = selectedField
        if (sCol === col && sRow === row)
            setSelectedField(undefined)
        else
            setSelectedField([col, row])
    }
  }

  const fieldColor = (col: number, row: number) => {
    if (selectedField != undefined) {
        const [sCol, sRow] = selectedField
        if (sCol === col && sRow === row)
            return "bg-warning"
    }
    return (col + row) % 2 == 0 ? "bg-light" : "bg-success"
  }

  return (
    <div className='border board-container'>
      {
        board.map((row: Piece[], rowIndex) => {
          return (
            <Row key={rowIndex}>
              {
                row.map((field: Piece, colIndex) => {
                  return (
                    <Col key={colIndex} className='p-0'>
                      <div 
                        className={fieldColor(colIndex, rowIndex) + " field"}
                        onClick={() => fieldOnClick(colIndex, rowIndex)}
                      >
                        { 
                          field == 'W'
                          ? <img src={WhitePawn} alt="White pawn" />
                          : field == 'B'
                            ? <img src={BlackPawn} alt="black pawn" />
                            : <></>
                        }
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          )
        })
      }
    </div>
  )
}

export default Board