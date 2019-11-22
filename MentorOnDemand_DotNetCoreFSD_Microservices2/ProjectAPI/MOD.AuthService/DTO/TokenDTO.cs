using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AuthService.DTO
{
    public class TokenDTO
    {
        public string Email { get; set; }
        public int Role { get; set; }
        public string Token { get; set; }
    }
}
