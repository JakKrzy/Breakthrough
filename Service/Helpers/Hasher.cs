using Microsoft.AspNetCore.Identity;
using Service.Models;
using System.Security.Cryptography;

namespace Service.Helpers
{
    public class Hasher
    {
        private static IPasswordHasher<String> _hasher = new PasswordHasher<String>();

        public static string HashPwd(String nickname, string password)
        {
            return _hasher.HashPassword(nickname, password);
        }

        public static bool VerifyPassword(String nickname, string storedPassword, string givenPassword)
        {
            return _hasher.VerifyHashedPassword(nickname, storedPassword, givenPassword)
                != PasswordVerificationResult.Failed;
        }
    }
}
