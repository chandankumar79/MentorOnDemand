using ProjectAPI.DTO;
using ProjectAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.Data
{
    public interface IStudentRepository
    {
        public int AddCourse(StudentCourseAddDTO courseAddDTO);
        public IEnumerable<StudentCourseSendDTO> GetCourses(string email);
        public IEnumerable<StudentGetCourseMentorsDTO> GetCourseMentors(int techId);
        public int UpdateCoursePayment(StudentCourseUpdatePaymentDTO updatePaymentDTO);
        public int CancelCourse(string email, int courseId);
        public int UpdateCourseRating(StudentCourseRatingDTO courseRatingDTO);
        public int UpdateCourseProgress(StudentCourseProgressDTO courseProgressDTO);
        public IEnumerable<Payment> GetPayments(string email);
        public IEnumerable<Technology> GetTechnologies();
        public IEnumerable<Technology> SearchCourses(string searchString);
        
    }
}
