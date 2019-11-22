using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MOD.SharedLibrary.Models;
using MOD.StudentLibrary;
using MOD.StudentLibrary.DTO;
using MOD.StudentLibrary.Repository;

namespace MOD.StudentLibrary.Repository
{
    public class StudentRepository : IStudentRepository
    {
        StudentContext context;
        private UserManager<MODUser> userManager;
        private RoleManager<IdentityRole> roleManager;

        public StudentRepository(
            StudentContext context,
            UserManager<MODUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public int AddCourse(StudentCourseAddDTO courseAddDTO)
        {
            try
            {
                // check if user with given email exists
                var student = context.MODUsers.SingleOrDefault(s => s.Email == courseAddDTO.Email);
                
                // check if student has already applied for this course
                var isExists = (from user in context.MODUsers
                                join studentCourse in context.StudentCourses on user equals studentCourse.User
                                join skill in context.MentorSkills on studentCourse.SkillId equals skill.SkillId
                                where user.Email == courseAddDTO.Email && studentCourse.SkillId == courseAddDTO.SkillId
                                select studentCourse).SingleOrDefault();
                if (isExists == null)
                {
                    var course = new StudentCourse
                    {
                        User = student,
                        SkillId = courseAddDTO.SkillId,
                    };
                    context.StudentCourses.Add(course);
                    var result = context.SaveChanges();
                    if (result > 0)
                    {
                        return 1; // successfully applied for the course
                    }
                    return 2; // internal server error
                }
                return 3; // already applied for this course
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<StudentGetCourseMentorsDTO> GetCourseMentors(int techId)
        {
            try
            {
                var mentors = from tech in context.Technologies
                              join skill in context.MentorSkills on tech.TechId equals skill.TechId
                              where tech.TechId == techId
                              select (new StudentGetCourseMentorsDTO
                              {
                                  SkillId = skill.SkillId,
                                  MentorName = $"{skill.User.FirstName} {skill.User.LastName}",
                                  StartDate = skill.StartDate,
                                  EndDate = skill.EndDate,
                                  TotalFee = skill.TotalFee,
                                  TotalRating = skill.User.TotalRating,
                                  RatingsCount = skill.User.TotalRatingsCount, // to be fetched from users > skill.User.TotalRating, skill.User.RatingsCount
                                  Experience = skill.User.Experience
                              });
                return mentors;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public void UpdateCourseStatus(int courseId, int statusCode)
        {
            try
            {
                var course = (from sc in context.StudentCourses
                             where sc.CourseId == courseId
                             select sc).SingleOrDefault();
                course.Status = statusCode;
                context.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<StudentCourseSendDTO> GetCourses(string email)
        {
            try
            {
                var courses = (from course in context.StudentCourses
                              join skill in context.MentorSkills on course.SkillId equals skill.SkillId
                              join tech in context.Technologies on skill.TechId equals tech.TechId
                              where course.User.Email == email
                              select (new StudentCourseSendDTO
                              {
                                  CourseId = course.CourseId,
                                  Name = tech.Name,
                                  MentorName = $"{skill.User.FirstName} {skill.User.LastName}",
                                  StartDate = skill.StartDate,
                                  EndDate = skill.EndDate,
                                  TotalFee = skill.TotalFee,
                                  Progress = course.Progress,
                                  Rating = course.Rating,
                                  Status = course.Status,
                                  PaymentStatus = course.PaymentStatus,
                                  PaymentId = course.PaymentId
                              })).ToList();
                for(int i=0; i<courses.Count; i++)
                {
                    if(courses[i].Status == 3 && courses[i].StartDate <= DateTime.Now)
                    {
                        UpdateCourseStatus(courses[i].CourseId, 4);
                        courses[i].Status = 4;
                    }
                }
                return courses;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public int UpdateCoursePayment(StudentCourseUpdatePaymentDTO updatePaymentDTO)
        {
            try
            {
                var course = (from studentCourse in context.StudentCourses
                              join student in context.MODUsers on studentCourse.User equals student
                              where student.Email == updatePaymentDTO.Email && studentCourse.CourseId == updatePaymentDTO.CourseId
                              select studentCourse).Include(sc => sc.User).SingleOrDefault();
                if (course != null)
                {
                    if (course.PaymentStatus)
                    {
                        return 4;
                    }
                    else if (course.Status == 6 || course.Status == 7)
                    {
                        return 5; // cancelled or rejected
                    }
                    course.PaymentStatus = true;
                    course.PaymentId = updatePaymentDTO.PaymentId;
                    course.Status = 3;
                    // payment transaction
                    var payment = new Payment
                    {
                        PaymentId = course.PaymentId,
                        User = course.User,
                        Amount = context.MentorSkills.Where(s => s.SkillId == course.SkillId).FirstOrDefault().TotalFee,
                        TransactionType = true
                    };
                    context.Payments.Add(payment);
                    context.StudentCourses.Update(course);
                    var result = context.SaveChanges();
                    if (result > 0)
                    {
                        return 1; // success
                    }
                    return 2; // error updating payment details
                }
                return 3; // course not found or payment already completed
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public int CancelCourse(string email, int courseId)
        {
            try
            {
                var course = (from student in context.MODUsers
                              join studentCourse in context.StudentCourses on student equals studentCourse.User
                              where student.Email == email && studentCourse.CourseId == courseId
                              select studentCourse).FirstOrDefault();
                if (course != null)
                {
                    // already completed or rejected
                    if (course.Status == 5 || course.Status == 7)
                    {
                        return 4;
                    }
                    course.Status = 6; // cancelled
                    var result = context.SaveChanges();
                    if (result > 0)
                    {
                        return 1;
                    }
                    return 2; // server error cannot cancel
                }
                return 3; // not found


            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public int UpdateCourseRating(StudentCourseRatingDTO courseRatingDTO)
        {
            try
            {
                var user = context.MODUsers.Where(u => u.Email == courseRatingDTO.Email).FirstOrDefault();
                var course = (from studentCourse in context.StudentCourses
                              join student in context.MODUsers on studentCourse.User equals student
                              where student.Email == courseRatingDTO.Email && studentCourse.CourseId == courseRatingDTO.CourseId
                              select studentCourse).FirstOrDefault();
                var mentor = (from m in context.MODUsers
                              join skill in context.MentorSkills on m equals skill.User
                              where skill.SkillId == course.SkillId
                              select m).FirstOrDefault();
                if (course != null)
                {
                    if (course.Rating < 6)
                    {
                        return 4; // already rated
                    }
                    else if (course.Status != 5 || courseRatingDTO.Rating > 5)
                    {
                        return 5; // course not completed yet
                    }
                    course.Rating = courseRatingDTO.Rating;

                    mentor.TotalRatingsCount += 1;
                    mentor.TotalRatingsSum += courseRatingDTO.Rating;
                    mentor.TotalRating = mentor.TotalRatingsSum / mentor.TotalRatingsCount;
                    var result = context.SaveChanges();
                    if (result > 0)
                    {
                        return 1; // success
                    }
                    return 2; // error updating status failed
                }
                return 3; // course not found
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public int UpdateCourseProgress(StudentCourseProgressDTO courseProgressDTO)
        {
            try
            {
                var course = (from studentCourse in context.StudentCourses
                              join student in context.MODUsers on studentCourse.User equals student
                              where student.Email == courseProgressDTO.Email && studentCourse.CourseId == courseProgressDTO.CourseId
                              select studentCourse).FirstOrDefault();
                if (course != null)
                {
                    if (course.Status != 4 || course.Status == 5)
                    {
                        return 4; // already progress is 100 or not ongoing or not completed
                    }
                    course.Progress = courseProgressDTO.Progress;
                    if (course.Progress == 100)
                    {
                        course.Status = 5; // completed
                    }
                    context.StudentCourses.Update(course);
                    var result = context.SaveChanges();
                    if (result > 0)
                    {
                        return 1; // success
                    }
                    return 2; // error updating status failed
                }
                return 3; // course not found
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<Technology> GetTechnologies()
        {
            try
            {
                return context.Technologies.Where(tech => tech.Status == true);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<Payment> GetPayments(string email)
        {
            try
            {
                var payments = (from payment in context.Payments
                                join user in context.MODUsers on payment.User equals user
                                where user.Email == email
                                select payment).ToList();
                return payments;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<Technology> SearchCourses(string searchString)
        {
            try
            {
                if (searchString == "undefined")
                {
                    return context.Technologies.ToList();
                }
                var technologies = from tech in context.Technologies
                                   where tech.Name.ToLower().Contains(searchString.ToLower())
                                        || tech.Description.ToLower().Contains(searchString.ToLower())
                                   select tech;
                return technologies;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
