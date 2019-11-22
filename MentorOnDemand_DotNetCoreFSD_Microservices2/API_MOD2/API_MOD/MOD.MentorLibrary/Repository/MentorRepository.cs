using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MOD.MentorLibrary;
using MOD.MentorLibrary.DTO;
using MOD.MentorLibrary.Repository;
using MOD.SharedLibrary.Models;

namespace MOD.MentorLibrary.Repository
{
    public class MentorRepository : IMentorRepository
    {
        MentorContext context;
        private UserManager<MODUser> userManager;
        private RoleManager<IdentityRole> roleManager;

        public MentorRepository(
            MentorContext context,
            UserManager<MODUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task<int> AddSkill(MentorSkillAddDTO addSkillDTO)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(addSkillDTO.Email);
                var tech = context.Technologies.Find(addSkillDTO.TechID);
                if (user == null || tech == null)
                {
                    return 2;
                }
                var isDublicate = context.MentorSkills.Where(ms => ms.User == user && ms.TechId == tech.TechId).FirstOrDefault();
                if (isDublicate == null)
                {
                    MentorSkill skill = new MentorSkill
                    {
                        User = user,
                        TechId = tech.TechId,
                        StartDate = addSkillDTO.StartDate,
                        EndDate = addSkillDTO.EndDate,
                        SkillSurcharge = addSkillDTO.SkillSurcharge,
                        TotalFee = Convert.ToDecimal(tech.BasicFee * (1 + 0.01 * (tech.Commission + addSkillDTO.SkillSurcharge))),
                        Status = true
                    };
                    context.MentorSkills.Add(skill);
                    int result = context.SaveChanges(); // returns number of changes
                    if (result > 0)
                    {
                        return 1; // success
                    }
                    return 2; // error
                }
                else
                {
                    return 3; // duplicate request
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> UpdateSkill(MentorSkillAddDTO updateSkillDTO)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(updateSkillDTO.Email);
                var tech = context.Technologies.Find(updateSkillDTO.TechID);
                var skill = context.MentorSkills.Where(skill => skill.TechId == updateSkillDTO.TechID).FirstOrDefault();
                if (user == null || skill == null)
                {
                    return false;
                }

                skill.StartDate = updateSkillDTO.StartDate;
                skill.EndDate = updateSkillDTO.EndDate;
                skill.SkillSurcharge = updateSkillDTO.SkillSurcharge;
                skill.TotalFee = Convert.ToDecimal(tech.BasicFee * (1 + 0.01 * (tech.Commission + updateSkillDTO.SkillSurcharge)));

                int result = context.SaveChanges(); // returns number of changes
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool DeleteSkill(int id, string email)
        {
            try
            {
                var user = context.MODUsers.Where(u => u.Email == email).FirstOrDefault();
                var skill = context.MentorSkills.Where(s => s.SkillId == id && s.User == user).FirstOrDefault();
                context.MentorSkills.Remove(skill);
                var result = context.SaveChanges();
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<IEnumerable<MentorSkillGetDTO>> GetSkills(string email)
        {
            try
            {
                var role = await userManager.GetUsersInRoleAsync("Mentor");
                var user = role.Where(r => r.Email == email).FirstOrDefault();
                if (user != null)
                {
                    var skills = from mentor in context.MODUsers
                                 join skill in context.MentorSkills on mentor equals skill.User
                                 join tech in context.Technologies on skill.TechId equals tech.TechId
                                 where mentor.Email == email
                                 select (new MentorSkillGetDTO
                                 {
                                     Email = mentor.Email,
                                     SkillId = skill.SkillId,
                                     TechId = skill.TechId,
                                     Name = tech.Name,
                                     BasicFee = tech.BasicFee,
                                     Commission = tech.Commission,
                                     SkillSurcharge = skill.SkillSurcharge,
                                     TotalFee = skill.TotalFee,
                                     StartDate = skill.StartDate,
                                     EndDate = skill.EndDate,
                                     ActiveStudents = context.StudentCourses.Count(sc => sc.Status == 4 && sc.SkillId == skill.SkillId),
                                     Status = skill.Status
                                 });
                    return skills;
                }
                return null;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<MentorGetNotifications> GetNotifications(string email)
        {
            try
            {
                var notifications = from mentor in context.MODUsers
                                    join skill in context.MentorSkills on mentor equals skill.User
                                    join tech in context.Technologies on skill.TechId equals tech.TechId
                                    join course in context.StudentCourses on skill.SkillId equals course.SkillId
                                    where mentor.Email == email
                                    select (new MentorGetNotifications
                                    {
                                        CourseId = course.CourseId,
                                        Course = tech.Name,
                                        Student = $"{course.User.FirstName} {course.User.LastName}",
                                        StartDate = skill.StartDate,
                                        EndDate = skill.EndDate,
                                        Progress = course.Progress,
                                        Status = course.Status
                                    });
                return notifications;
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
                // only return technologies which are active and not blocked by admin
                return context.Technologies.Where(t => t.Status == true).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MentorSkillGetDTO GetSkill(string email, int techId)
        {
            try
            {
                var res = (from user in context.MODUsers
                           join skill in context.MentorSkills on user equals skill.User
                           join tech in context.Technologies on skill.TechId equals tech.TechId
                           where user.Email == email && tech.TechId == techId
                           select new MentorSkillGetDTO
                           {
                               Email = user.Email,
                               SkillId = skill.SkillId,
                               TechId = tech.TechId,
                               Name = tech.Name,
                               SkillSurcharge = skill.SkillSurcharge,
                               TotalFee = skill.TotalFee,
                               StartDate = skill.StartDate,
                               EndDate = skill.EndDate,
                               Status = skill.Status
                           }).FirstOrDefault();
                Console.WriteLine(res);
                return res;
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
        public int UpdateCourseStatus(MentorUpdateCourseDTO mentorUpdateCourseDTO)
        {
            try
            {
                var mentor = context.MODUsers.SingleOrDefault(m => m.Email == mentorUpdateCourseDTO.Email);
                if (mentor != null)
                {
                    var course = (from studentCourse in context.StudentCourses
                                  where studentCourse.CourseId == mentorUpdateCourseDTO.CourseId
                                  select studentCourse).SingleOrDefault();
                    if (course.Status == 1)
                    {
                        if (mentorUpdateCourseDTO.Status == "accepted")
                        {
                            course.Status = 2;
                        }
                        else if (mentorUpdateCourseDTO.Status == "rejected")
                        {
                            course.Status = 7;
                        }
                        var result = context.SaveChanges();
                        if (result > 0)
                        {
                            return 1; // success
                        }
                        return 2; // error updating 
                    }
                    return 3; // invalid action
                }
                return 4; // invalid user
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
