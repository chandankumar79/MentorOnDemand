using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.SharedLibrary.Models
{
    public class MODUser: IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public Gender Gender { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        public string LinkedInProfile { get; set; }
        public int Experience { get; set; } = 0; // case admin or student not applicable
        public decimal TotalRating { get; set; } = 5; // case admin or student not applicable
        public long TotalRatingsSum { get; set; } = 5; // case admin or student not applicable
        public long TotalRatingsCount { get; set; } = 1;  // case admin or student not applicable
        public bool Status { get; set; } = true;

    }
}
