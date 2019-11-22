using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.MentorLibrary.DTO
{
    public class MentorUpdateCourseDTO
    {
        public string Email { get; set; }
        public int CourseId { get; set; }
        public string Status { get; set; }
    }
}
