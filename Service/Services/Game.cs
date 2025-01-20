namespace Service.Services
{
    public class Game
    {
        public int Player1Id { get; set; }
        public int? Player2Id { get; set; }

        public string Player1ConnectionId { get; set; }
        public string? Player2ConnectionId { get; set; }

        public string RoomName {  get; set; }

        public int Player1Color { get; set; }
        public int Player2Color { get; set; }

        private int[][] Board;
        public int Turn { get; private set; }

        public Game(int playerId, string playerConnectionId, string roomName)
        {
            Player1Id = playerId;
            Player1ConnectionId = playerConnectionId;
            Player1Color = 0;
            Player2Color = 1;
            RoomName = roomName;
            Turn = 0;
            makeBoard();
        }

        public (int[][], int[][]) GetBoards()
        {
            return (Board, GetFlippedBoard());
        }

        private int[][] GetFlippedBoard()
        {
            var flippedBoard = new int[8][];
            for (int i = 0; i < 8; i++)
            {
                flippedBoard[i] = new int[8];
                for (int j = 0; j < 8; j++)
                    flippedBoard[i][j] = Board[7 - i][7 - j];
            }
            return flippedBoard;
        }

        private void makeBoard()
        {
            int[] whiteRow      = {  0,  0,  0,  0,  0,  0,  0,  0 };
            int[] blackRow      = {  1,  1,  1,  1,  1,  1,  1,  1 };
            int[] unoccupiedRow = { -1, -1, -1, -1, -1, -1, -1, -1 };

            Board = new int[8][];
            for (int i = 0; i < 8; i++)
            {
                Board[i] = new int[8];
                if (i >= 6)
                    whiteRow.CopyTo(Board[i], 0);
                else if (i <= 1)
                    blackRow.CopyTo(Board[i], 0);
                else
                    unoccupiedRow.CopyTo(Board[i], 0);
            }
        }

        private (int, int, int, int) ParseMove(string move)
        {
            if (move.Length != 4) throw new ArgumentException("Invalid move string");
            return (move[0] - '0', move[1] - '0', move[2] - '0', move[3] - '0');
        }

        private (int, int, int, int) FlipMoveIfNeeded((int, int, int, int) move, int player)
        {
            if (player == 0) return move;
            var (fromCol, fromRow, toCol, toRow) = move;
            return (7 - fromCol, 7 - fromRow, 7 - toCol, 7 - toRow);
        }

        public bool IsValidMove(string move, int player)
        {
            var (fromCol, fromRow, toCol, toRow) = FlipMoveIfNeeded(ParseMove(move), player);
            
            if (Board[fromRow][fromCol] != player) return false;
            if (Math.Abs(toCol - fromCol) > 1) return false;
            if (player == 0 && toRow != fromRow - 1) return false;
            if (player == 1 && toRow != fromRow + 1) return false;

            if (Board[toRow][toCol] == 1 - player && toCol == fromCol)
                return false;

            return true;
        }

        public void Move(string move, int player)
        {
            var (fromCol, fromRow, toCol, toRow) = FlipMoveIfNeeded(ParseMove(move), player);
            Board[fromRow][fromCol] = -1;
            Board[toRow][toCol] = player;
            Turn += 1;
        }

        public bool IsWin(int player)
        {
            var endRow = Board[7 * player];
            return endRow.Any(x => x == player);
        }
    }
}
