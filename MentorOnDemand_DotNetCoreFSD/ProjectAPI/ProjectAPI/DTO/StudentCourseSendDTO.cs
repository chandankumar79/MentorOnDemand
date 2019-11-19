using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.DTO
{
    public class StudentCourseSendDTO
    {
        public int CourseId { get; set; }
        public string Name { get; set; }
        public string MentorName { get; set; } // mentor name
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalFee { get; set; }
        public bool PaymentStatus { get; set; }
        public string PaymentId { get; set; }
        public int Progress { get; set; }
        public int Rating { get; set; }
        public int Status { get; set; }
    }
}
