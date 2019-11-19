using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.DTO
{
    public class UpdateUserDTO
    {
        public string Name { get; set; }
        [Email]
        public string Email { get; set; }
        public int Rating { get; set; }
        public bool Status { get; set; }
    }
}
