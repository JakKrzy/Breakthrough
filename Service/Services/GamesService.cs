using Service.Models;

namespace Service.Services
{
    public class GamesService
    {
        private static List<Game> games = new();

        public void AddGame(int playerId, string playerConnectionId, string roomName)
        {
            lock (games)
            {
                games.Add(new Game(playerId, playerConnectionId, roomName));
            }
        }

        public Game? GetGame(int playerId)
        {
            Game? game;
            lock (games)
            {
                game = games.FirstOrDefault(g => g.Player1Id == playerId || g.Player2Id == playerId);
            }
            return game;
        }

        public Game? GetGame(string connectionId)
        {
            Game? game;
            lock (games)
            {
                game = games.FirstOrDefault(g =>
                    g.Player1ConnectionId == connectionId || g.Player2ConnectionId == connectionId);
            }
            return game;
        }
        
        public void RemoveGame(int playerId)
        {
            var game = GetGame(playerId);
            if (game != null)
                lock (games) { games.Remove(game); }
        }

    }
}
