using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Service.Context;
using System.Runtime.CompilerServices;

namespace Service.Hubs
{
    [Authorize]
    public class AnonUserHub : Hub
    {
        private BreakthroughDbContext _db;
        public AnonUserHub(BreakthroughDbContext db) { _db = db; }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userName = Context.User.Identity?.Name;
            if (userName == null) throw new Exception("User not authenticated");

            var user = _db.Users.SingleOrDefault(u => u.Nickname == userName);
            if (user == null) throw new Exception("User not found");

            var games = await _db.Games.Where(g => g.LoserId == user.Id || g.WinnerId == user.Id).ToListAsync();
            foreach (var game in games)
            {
                if (game.WinnerId == user.Id)
                    game.WinnerId = null;
                else if (game.LoserId == user.Id)
                    game.LoserId = null;
            }

            _db.Games.UpdateRange(games);
            await _db.SaveChangesAsync();
            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
        }
    }
}
