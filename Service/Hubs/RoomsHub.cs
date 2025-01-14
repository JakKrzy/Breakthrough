using Microsoft.AspNetCore.SignalR;
using Service.Models;
using Service.Context;

public interface IRoomsClient
{
    Task ReceiveRooms(List<Room> rooms);
}

namespace Service.Hubs
{
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
            await Clients.All.ReceiveRooms(rooms);
        }

        public async Task CreateRoom(string usersJwt)
        {
            var clientId = Context.ConnectionId;
            var user = _db.Users.Where(user => user.Token == usersJwt).FirstOrDefault();
            if (user == null)
                throw new ArgumentException("usersJwt not found");
            var room = new Room()
            {
                Name = $"{user.Nickname}'s room",
                Player1Id = user.Id
            };

            await _db.Rooms.AddAsync(room);
            await _db.SaveChangesAsync();

            var rooms = _db.Rooms.ToList();

            await Clients.All.ReceiveRooms(rooms);
        }
    }
}
