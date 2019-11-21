using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AdminLibrary.DTO
{
    public class AdminDashboardDTO
    {
        public int StudentsActive { get; set; }
        public int StudentsBlocked { get; set; }
        public int MentorsActive { get; set; }
        public int MentorsBlocked { get; set; }
        public int TechnologiesActive { get; set; }
        public int TechnologiesBlocked { get; set; }
        public int RegisteredSkills { get; set; }
        public int RegisteredCourses { get; set; }
    }
}
