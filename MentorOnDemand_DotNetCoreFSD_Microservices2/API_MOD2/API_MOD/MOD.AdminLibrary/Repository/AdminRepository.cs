using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MOD.AdminLibrary.DTO;
using MOD.SharedLibrary.Models;

namespace MOD.AdminLibrary.Repository
{
    public class AdminRepository : IAdminRepository
    {
        AdminContext context;
        private UserManager<MODUser> userManager;
        private RoleManager<IdentityRole> roleManager;

        public AdminRepository(AdminContext context, UserManager<MODUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task<bool> AddTechAsync(TechnologyDTO technologyDTO)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(technologyDTO.UserEmail);
                if(user == null)
                {
                    return false;
                }
                Technology technology = new Technology
                {
                    Name = technologyDTO.Name,
                    Description = technologyDTO.Description,
                    ImgSourceLink = technologyDTO.ImgSourceLink,
                    BasicFee = technologyDTO.BasicFee,
                    Commission = technologyDTO.Commission,
                    Duration = technologyDTO.Duration,
                    User = user
                };
                context.Technologies.Add(technology);

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

        public async Task<bool> DeleteTechAsync(Technology technology)
        {
            // pending
            try
            {
                context.Technologies.Remove(technology);
                var result = await context.SaveChangesAsync();
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

        public async Task<Technology> GetTechById(int id)
        {
            try
            {
                return await context.Technologies.FindAsync(id);
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
                return context.Technologies.ToList();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

       public async Task<AdminDashboardDTO> GetDashboard()
        {
            try
            {
                var students = await userManager.GetUsersInRoleAsync("Student");
                var mentors = await userManager.GetUsersInRoleAsync("Mentors");
                return new AdminDashboardDTO
                {
                    TechnologiesActive = context.Technologies.Where(tech => tech.Status == true).Count(),
                    TechnologiesBlocked = context.Technologies.Where(tech => tech.Status == false).Count(),
                    RegisteredSkills = context.MentorSkills.Count(),
                    RegisteredCourses = context.StudentCourses.Count(),
                    StudentsActive = students.Where(s => s.Status == true).Count(),
                    StudentsBlocked = students.Where(s => s.Status == false).Count(),
                    MentorsActive = students.Where(m => m.Status == true).Count(),
                    MentorsBlocked = students.Where(m => m.Status == false).Count()
                };
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<AdminGetPaymentsDTO> GetPayments()
        {
            try
            {
                var payments = from payment in context.Payments
                               join user in context.MODUsers on payment.User equals user
                               select new AdminGetPaymentsDTO
                               {
                                   PaymentId = payment.PaymentId,
                                   DateOfTransaction = payment.DateOfTransaction,
                                   Amount = payment.Amount,
                                   TransactionType = payment.TransactionType,
                                   UserEmail = user.Email,
                                   UserName = $"{user.FirstName} {user.LastName}",
                                   UserRole = context.UserRoles.SingleOrDefault(ur => ur.UserId == user.Id).RoleId
                               };
                return payments;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<IEnumerable<AdminGetMentorsDTO>> GetMentors()
        {
            try
            {
                var users = await userManager.GetUsersInRoleAsync("Mentor");
                var result = users.Select(u => new AdminGetMentorsDTO
                {
                    Name = $"{u.FirstName} {u.LastName}",
                    Email = u.Email,
                    TotalRating = u.TotalRating,
                    ActiveStudents = (from student in context.MODUsers
                                     join courses in context.StudentCourses on student equals courses.User
                                     join skill in context.MentorSkills on courses.SkillId equals skill.SkillId
                                     join mentor in context.MODUsers on skill.User equals mentor
                                     where courses.Status == 4 && mentor.Email == u.Email
                                     select student).Count(),
                    SkillsCount = (from mentor in context.MODUsers
                                   join skill in context.MentorSkills on mentor equals skill.User
                                   where mentor.Email == u.Email
                                   select skill).Count(),
                    Status = u.Status
                });
                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<IEnumerable<AdminGetStudents>> GetStudents()
        {
            try
            {
                var users = await userManager.GetUsersInRoleAsync("Student");
                var result = users.Select(u => new AdminGetStudents
                {
                    Name = $"{u.FirstName} {u.LastName}",
                    Email = u.Email,
                    ActiveCourses = (from student in context.MODUsers
                                     join courses in context.StudentCourses on student equals courses.User
                                     where student.Email == u.Email && courses.Status == 4
                                     select courses).Count(),
                    CompletedCourses = (from student in context.MODUsers
                                        join courses in context.StudentCourses on student equals courses.User
                                        where student.Email == u.Email && courses.Status == 5
                                        select courses).Count(),
                    TotalCourses = (from student in context.MODUsers
                                    join courses in context.StudentCourses on student equals courses.User
                                    where student.Email == u.Email
                                    select courses).Count(),                    
                    Status = u.Status
                });
                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool UpdateTech(UpdateTechDTO updatedTechDTO)
        {
            try
            {
                var updatedTech = new Technology
                {
                    TechId = updatedTechDTO.TechId,
                    Name = updatedTechDTO.Name,
                    Description = updatedTechDTO.Description,
                    ImgSourceLink = updatedTechDTO.ImgSourceLink,
                    BasicFee = updatedTechDTO.BasicFee,
                    Commission = updatedTechDTO.Commission,
                    Duration = updatedTechDTO.Duration,
                    Status = updatedTechDTO.Status
                };
                context.Technologies.Update(updatedTech);
                int result = context.SaveChanges();
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

        public async Task<bool> UpdateUserStatus(UpdateUserStatusDTO updateUserStatus)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(updateUserStatus.Email);
                user.Status = updateUserStatus.Status;
                var result = context.SaveChanges();
                if(result == 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
    }
}
