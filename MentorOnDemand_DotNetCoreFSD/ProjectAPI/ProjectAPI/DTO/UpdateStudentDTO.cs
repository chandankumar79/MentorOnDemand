using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.DTO
{
    public class UpdateStudentDTO
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public bool Status { get; set; }
    }
}
