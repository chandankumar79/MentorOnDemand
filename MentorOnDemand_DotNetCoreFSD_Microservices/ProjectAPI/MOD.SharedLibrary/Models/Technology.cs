using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.SharedLibrary.Models
{
    public class Technology
    {
        [Key]
        public int TechId { get; set; }
        [Required]
        public MODUser User { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Url]
        public string ImgSourceLink { get; set; }
        [Required]
        public int BasicFee { get; set; } // basic fee of technology
        [Required]
        [Range(0, 100, ErrorMessage = "Commission should be as percentage of basic fee between 0 and 100")]
        public int Commission { get; set; } // Commission as a percentage of basic fee // Range = [0 - 100]
        [Required]
        public int Duration { get; set; } // Duration as number of days to complete the course 
        public bool Status { get; set; } = true; // active or disabled
    }
}
