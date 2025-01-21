using Microsoft.AspNetCore.SignalR;
using Service.Models;
using Service.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.CompilerServices;

public interface IRoomsClient
{
    Task ReceiveRooms(List<Room> rooms);
}

namespace Service.Hubs
{
    [Authorize]
    public class RoomsHub : Hub<IRoomsClient>
    {
        private BreakthroughDbContext _db;

        public RoomsHub(BreakthroughDbContext dbContext)
        {
            _db = dbContext;
        }

        public override async Task OnConnectedAsync()
        {
            var clientId = Context.ConnectionId;

            var rooms = _db.Rooms.ToList();
            await Clients.Client(clientId).ReceiveRooms(rooms);
        }

        public async Task CreateRoom()
        {
            var userName = Context.GetHttpContext()?.User.Identity?.Name;
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Nickname == userName);
            if (user == null)
                throw new ArgumentException("User not found");
            var room = new Room()
            {
                Name = $"{user.Nickname}'s room",
                Player1Id = user.Id
            };

            await _db.Rooms.AddAsync(room);
            await _db.SaveChangesAsync();

            await DisplayRooms();
        }

        public async Task JoinRoom(string usersJwt, int roomId)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Token == usersJwt);
            if (user == null) throw new ArgumentException("User not found");
            
            var room = await _db.Rooms.FirstOrDefaultAsync(r => r.Id == roomId);
            if (room == null) throw new ArgumentException("Room not found");

            room.Player2Id = user.Id;
            await _db.SaveChangesAsync();

            await DisplayRooms();
        }

        private async Task DisplayRooms()
        {
            var rooms = _db.Rooms.Where(r => r.Player2Id == null).ToList();
            await Clients.All.ReceiveRooms(rooms);
        }
    }
}
