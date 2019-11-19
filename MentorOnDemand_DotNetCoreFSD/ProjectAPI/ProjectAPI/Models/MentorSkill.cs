using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using RequiredAttribute = System.ComponentModel.DataAnnotations.RequiredAttribute;

namespace ProjectAPI.Models
{
    public class MentorSkill
    {
        [Key]
        public int SkillId { get; set; }
        [Required] 
        //[Index(Unique = true)]
        public int TechId { get; set; }
        [Required]
        public MODUser User { get; set; }
        //public decimal Rating { get; set; } = 5; // Range = [0 - 5]
        //public int RatingsCount { get; set; } = 0; // Number of times rated
        [Required]
        public int SkillSurcharge { get; set; } = 0; // Range = [0 - 100]
        [Required]
        public decimal TotalFee { get; set; } // TotalFee = BasicFee * ((100 + Commission + MentorSkillSurcharge)/100)
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public bool Status { get; set; } = true; // active or disabled
    }
}
