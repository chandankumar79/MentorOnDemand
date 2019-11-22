using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AdminLibrary.DTO
{
    public class UpdateUserStatusDTO
    {
        public string Email { get; set; }
        public bool Status { get; set; }
    }
}
