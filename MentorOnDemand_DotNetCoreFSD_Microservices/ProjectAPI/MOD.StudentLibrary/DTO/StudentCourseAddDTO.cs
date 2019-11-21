using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.StudentLibrary.DTO
{
    public class StudentCourseAddDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public int SkillId { get; set; }
    }
}
