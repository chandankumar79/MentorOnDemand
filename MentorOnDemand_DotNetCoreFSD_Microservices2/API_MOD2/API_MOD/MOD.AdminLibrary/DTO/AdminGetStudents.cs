using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AdminLibrary.DTO
{
    public class AdminGetStudents
    {
        public string Name { get; set; }
        [Email]
        public string Email { get; set; }
        public int ActiveCourses { get; set; }
        public int CompletedCourses { get; set; }
        public int TotalCourses { get; set; }
        public bool Status { get; set; }
    }
}
