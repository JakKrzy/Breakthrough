import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const Rules = () => {
  return (
    <Container className="mt-3">
        <h1>Rules</h1>
        <Row>
            <Col>
                <div>
                    <h3>Initial setup</h3>
                    <p>
                        The board is initially set up as shown on the first diagram, except on a 8x8 board.
                        White moves first; then play alternates, with each player moving one piece per turn.
                    </p>
                    <h3>Moving and capturing</h3>
                    <p>
                        A piece may move one space straight or diagonally forward if the target square is empty.
                        In the second diagram, the white piece on left can move into any of the marked squares.
                        <br />
                        A piece may move into a square containing an opponent's piece if and only if that square is one step diagonally forward.
                        The opponent's piece is removed and the player's piece replaces it.
                        <br />
                        Note that capturing is not compulsory, nor is it "chained" as in checkers; a player can only capture one piece in a turn.
                    </p>
                    <h3>Win conditions</h3>
                    <p>
                        The first player to reach the opponent's home row — the one farthest from the player — is the winner.
                        If all the pieces of a player are captured, that player loses.<br />
                        A draw is impossible because pieces can only move ahead (or be captured), and the piece closest to the opponent's home row always has at least one forward diagonal move available.
                    </p>
                </div>
            </Col>
            <Col>
                <Image src="https://www.chessprogramming.org/images/d/d0/Breakthrough5x5.jpg" thumbnail/>
            </Col>
        </Row>

    </Container>
  )
}

export default Rules