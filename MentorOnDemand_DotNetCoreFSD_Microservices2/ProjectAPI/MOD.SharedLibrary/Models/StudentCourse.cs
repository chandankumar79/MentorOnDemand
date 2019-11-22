using MOD.SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.SharedLibrary.Models
{
    public class StudentCourse
    {
        [Key]
        public int CourseId { get; set; }
        [Required]
        public MODUser User { get; set; } // student
        [Required]
        public int SkillId { get; set; }
        public int Progress { get; set; } = 0;
        public int Rating { get; set; } = 10; // Rating [0-5] | if > 5 implies not rated
        public bool PaymentStatus { get; set; } = false;
        public string PaymentId { get; set; } = null;
        public int Status { get; set; } = 1;
        // Proposed | Accepted | Approved | Ongoing | Completed | Cancelled | Rejected | Failed
        // 1: Proposed = Student has applied for the course
        // 2: Accepted = Mentor has accepted the request
        // 3: Approved = Student has paid for the course
        // 4: Ongoing = Course is ongoing; Progress between [0 and 100)
        // 5: Completed = Course has completed; Progress is 100%; 
        // 6: Cancelled = Course cancelled by Student;
        // 7: Rejected = Request rejected by Mentor
        // 8: PaymentFailed = Payment has failed
    }
}
