import { useEffect, useState } from 'react'
import { useAlert } from '../../context/AlertProvider'
import * as SignalR from '@microsoft/signalr'
import BlackPawn from '../../assets/BlackPawn.svg'
import WhitePawn from '../../assets/WhitePawn.svg'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserProvider'
import './Board.css'

type Piece = 0 | 1 | null
type Board = Piece[][]

type SelectedField = [number, number] | undefined

type GameState = {
  board: Board
}

type ResultModalState = {
  show: boolean,
  message: string
}

const Board = () => {
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(null)
  const [gameState, setGameState] = useState<GameState>({
    board: Array(8).fill(Array(8).fill(null))
  })
  const [selectedField, setSelectedField] = useState<SelectedField>(undefined)
  const [resultModal, setResultModal] = useState<ResultModalState>({ show: false, message: "" })
  const { showAlert } = useAlert()
  const { userState } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
      const newConnection = new SignalR.HubConnectionBuilder()
          .withUrl(
            `${import.meta.env.VITE_HOST}/playHub`,
            { accessTokenFactory: () => sessionStorage.getItem("accessToken") || "" })
          .withAutomaticReconnect()
          .build()
  
      setConnection(newConnection)
      setResultModal({ show: false, message: "" })
  }, [])

  useEffect(() => {
    if (!userState.isLoggedIn && connection) {
      connection.stop()
      setConnection(null)
      navigate("/")
    }
  }, [userState.isLoggedIn])

  useEffect(() => {
      if (!connection) return
      connection.start()
          .then(() => {
              connection.on("DisplayBoard", (board: any) => setGameState({ board }))
              connection.on("PromptMove", (msg: string) => showAlert(msg))
              connection.on("OpponentDisconnected", () => { connection.stop(); setConnection(null) })
              connection.on("NotifyWin",  () => gameEnd("You win!"))
              connection.on("NotifyLoss", () => gameEnd("You lose..."))
          })
  }, [connection])

  const showModal = (msg: string) => {
    setResultModal({ show: true, message: msg })
  }

  const onModalClose = () => {
    setResultModal({ show: false, message: "" })
  }

  const gameEnd = (modalText: string) => {
    showModal(modalText)
    connection?.stop()
    setConnection(null)
  }

  const move = (toCol: number, toRow: number) => {
    if (selectedField === undefined) return
    const [sCol, sRow] = selectedField
    connection?.invoke("PlayMove", `${sCol}${sRow}${toCol}${toRow}`)
  }

  const isMoveValid = (col: number, row: number) => {
    if (selectedField === undefined) return false
    const [scol, srow] = selectedField
    if (Math.abs(col - scol) > 1) return false
    if (row != srow + 1) return false
    console.log(row, srow)
    return true
  }

  const fieldOnClick = (col: number, row: number) => {
    if (selectedField === undefined)
      setSelectedField([col, row])
    else {
        const [sCol, sRow] = selectedField
        if ((sCol === col && sRow === row) || !isMoveValid(col, row))
          setSelectedField(undefined)
        else
          console.log(col, row)
          move(col, row)
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
    <>
      <div className='border board-container'>
        {
          gameState.board.map((row: Piece[], rowIndex) => {
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
                            field === 0
                            ? <img src={WhitePawn} alt="White pawn" />
                            : field === 1
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
      <Modal show={resultModal.show} onHide={onModalClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{resultModal.message}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <NavLink to="/rooms" onClick={onModalClose}>
              Look for more games
            </NavLink>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  )
}

export default Board