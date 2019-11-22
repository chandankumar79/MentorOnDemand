using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.StudentLibrary.DTO
{
    public class StudentCourseUpdatePaymentDTO
    {
        public string Email { get; set; }
        public int CourseId { get; set; }
        public string PaymentId { get; set; }
    }
}
