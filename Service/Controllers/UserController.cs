﻿using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Service.Context;
using Service.Helpers;
using Service.Models;
using Service.Models.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.RegularExpressions;

namespace Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly BreakthroughDbContext _dbContext;
        public UserController(BreakthroughDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (user.Nickname == null || user.Password == null)
                return BadRequest();

            var _user = await _dbContext.Users.FirstOrDefaultAsync(
                _user => _user.Nickname == user.Nickname);
            if (_user == null)
                return NotFound(new { message = "Nickname or password incorrect" });

            if (!Hasher.VerifyPassword(user.Nickname, _user.Password, user.Password))
                return NotFound(new { message = "Nickname or password incorrect" });

            _user.Token = createJwt(user);
            _user.RefreshToken = createRefreshToken();
            _user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(5);
            await _dbContext.SaveChangesAsync();

            return Ok(new { 
                message = "User logged in",
                tokens = new TokenDto()
                {
                    AccessToken = _user.Token,
                    RefreshToken = _user.RefreshToken
                }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user.Nickname == null || user.Password == null)
                return BadRequest();

            if (await _dbContext.Users.AnyAsync(
                _user => _user.Nickname == user.Nickname))
                return BadRequest(new { message = "Account with that nickname already exists" });

            user.Password = Hasher.HashPwd(user.Nickname, user.Password);

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Register successful" });
        }

        private string createJwt(User user)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Not so secret secretNot so secret secretNot so secret secret");

            var identity = new ClaimsIdentity(
                new Claim[] { new Claim(ClaimTypes.Name, user.Nickname) });

            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var token = jwtHandler.CreateToken(new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = credentials
            });
            return jwtHandler.WriteToken(token);
        }

        private string createRefreshToken()
        {
            var token = Convert.ToBase64String(
                RandomNumberGenerator.GetBytes(64));
            if (_dbContext.Users.Any(user => user.RefreshToken == token))
                return createRefreshToken();
            return token;
        }
    }
}
