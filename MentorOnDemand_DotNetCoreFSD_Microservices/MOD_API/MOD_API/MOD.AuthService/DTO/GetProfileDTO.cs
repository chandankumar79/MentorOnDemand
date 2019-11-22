using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AuthServices.DTO
{
    public class GetProfileDTO
    {
        public string Email { get; set; }
        public int Role { get; set; }
    }
}
