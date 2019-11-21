using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.MentorLibrary.DTO
{
    public class MentorGetNotifications
    {
        public int CourseId { get; set; }
        public string Course { get; set; }
        public string Student { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Progress { get; set; }
        public int Status { get; set; }
    }
}
