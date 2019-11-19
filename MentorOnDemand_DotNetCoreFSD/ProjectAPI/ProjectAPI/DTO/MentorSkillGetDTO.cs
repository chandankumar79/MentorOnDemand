using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.DTO
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
        //public decimal Rating { get; set; }
        //public int RatingsCount { get; set; }
        [Required]
        public int SkillSurcharge { get; set; }
        [Required]
        public decimal TotalFee { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public bool Status { get; set; }
    }
}
