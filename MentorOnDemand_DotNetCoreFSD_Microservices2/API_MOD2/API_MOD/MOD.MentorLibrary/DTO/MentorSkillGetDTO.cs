using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.MentorLibrary.DTO
{
    public class MentorSkillGetDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public int SkillId { get; set; }
        [Required]
        public int TechId { get; set; }
        [Required]
        public string Name { get; set; }
        public int BasicFee { get; set; }
        public int Commission { get; set; }
        [Required]
        public int SkillSurcharge { get; set; }
        [Required]
        public decimal TotalFee { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public int ActiveStudents { get; set; }
        [Required]
        public bool Status { get; set; }
    }
}
