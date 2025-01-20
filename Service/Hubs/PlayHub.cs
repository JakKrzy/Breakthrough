using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Service.Context;
using Service.Models;
using Service.Services;

namespace Service.Hubs
{
    public interface IPlayHubClient
    {
        Task DisplayBoard(int[][] board);
        Task OpponentDisconnected();
        Task PromptMove(string message);
        Task NotifyWin();
        Task NotifyLoss();
    }

    [Authorize]
    public class PlayHub : Hub<IPlayHubClient>
    {
        private BreakthroughDbContext _db;
        private GamesService _gamesService;

        public PlayHub(BreakthroughDbContext dbContext, GamesService gamesService)
        {
            _db = dbContext;
            _gamesService = gamesService;
        }

        public override async Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;
            var userName = Context.GetHttpContext()?.User.Identity?.Name;

            var user = _db.Users.FirstOrDefault(u => u.Nickname == userName);
            if (user == null) throw new Exception("User not found");

            var room = _db.Rooms.FirstOrDefault(r => r.Player1Id == user.Id || r.Player2Id == user.Id);
            if (room == null) throw new Exception("User not in a room");

            var opponentId = room.Player1Id == user.Id ? room.Player2Id : room.Player1Id;
            Game? game;
            if (opponentId == null)
            {
                _gamesService.AddGame(user.Id, connectionId, room.Name);
                game = _gamesService.GetGame(user.Id);
            } else
            {
                game = _gamesService.GetGame((int)opponentId);
                game.Player2Id = user.Id;
                game.Player2ConnectionId = connectionId;
            }

            if (game == null)
                throw new Exception("Game not found");
            var (board, flipped) = game.GetBoards();
            await Groups.AddToGroupAsync(connectionId, room.Name);
            await Clients.Client(connectionId).DisplayBoard(game.Player1Id == user.Id ? board : flipped);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionId = Context.ConnectionId;
            var userName = Context.GetHttpContext()?.User.Identity?.Name;
            if (userName == null) throw new Exception("User not found");

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Nickname == userName);
            if (user == null) throw new Exception("User not found");
            
            var room = await _db.Rooms.FirstOrDefaultAsync(r => r.Player1Id == user.Id || r.Player2Id == user.Id);
            if (room == null) throw new Exception("User not in a room");

            await Clients.Group(room.Name).OpponentDisconnected();

            _db.Rooms.Remove(room);
            await _db.SaveChangesAsync();
            _gamesService.RemoveGame(user.Id);
        }

        public async Task PlayMove(string move)
        {
            var connectionId = Context.ConnectionId;

            var game = _gamesService.GetGame(connectionId);
            if (game == null || game.Player2Id == null) return;

            var playerColor = game.Player1ConnectionId == connectionId ? game.Player1Color : game.Player2Color;
            if (game.Turn % 2 != playerColor) return;

            var oppsConnectionId = playerColor == game.Player1Color
                ? game.Player2ConnectionId : game.Player1ConnectionId;

            if (!game.IsValidMove(move, playerColor))
            {
                await Clients.Client(connectionId).PromptMove("That's an invalid move");
                return;
            }

            game.Move(move, playerColor);
            var (board, flipped) = game.GetBoards();
            if (playerColor == 0)
            {
                await Clients.Client(connectionId).DisplayBoard(board);
                await Clients.Client(oppsConnectionId).DisplayBoard(flipped);
            } else
            {
                await Clients.Client(connectionId).DisplayBoard(flipped);
                await Clients.Client(oppsConnectionId).DisplayBoard(board);
            }

            if (game.IsWin(playerColor))
            {
                await Clients.Client(connectionId).NotifyWin();
                await Clients.Client(oppsConnectionId).NotifyLoss();
            }
        }
        
    }
}
