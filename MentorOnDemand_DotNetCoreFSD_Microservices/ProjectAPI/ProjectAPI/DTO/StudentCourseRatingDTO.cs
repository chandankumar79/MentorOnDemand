using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.DTO
{
    public class StudentCourseRatingDTO
    {
        public string Email { get; set; }
        public int CourseId { get; set; }
        public int Rating { get; set; }
    }
}
