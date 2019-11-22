using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AdminLibrary.DTO
{
    public class AdminGetMentorsDTO
    {
        public string Name { get; set; }
        [Email]
        public string Email { get; set; }
        public decimal TotalRating { get; set; }
        public int ActiveStudents { get; set; }
        public int SkillsCount { get; set; }
        public bool Status { get; set; }
    }
}
