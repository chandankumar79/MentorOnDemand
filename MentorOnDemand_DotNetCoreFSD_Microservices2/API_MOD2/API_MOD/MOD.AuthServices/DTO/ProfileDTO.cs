using MOD.SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AuthService.DTO
{
    public class ProfileDTO
    {
        public string FirstName { get; set; }
        public String LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public int Role { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string LinkedInProfile { get; set; }
        public int Experience { get; set; }
        public decimal Rating { get; set; }
        public bool Status { get; set; }

    }
}
