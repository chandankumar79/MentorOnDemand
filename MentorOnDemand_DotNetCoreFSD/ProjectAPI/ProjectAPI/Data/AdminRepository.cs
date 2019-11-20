using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ProjectAPI.DTO;
using ProjectAPI.Models;

namespace ProjectAPI.Data
{
    public class AdminRepository : IAdminRepository
    {
        ProjectContext context;
        private UserManager<MODUser> userManager;
        private RoleManager<IdentityRole> roleManager;

        public AdminRepository(ProjectContext context, UserManager<MODUser> userManager, RoleManager<IdentityRole> roleManager)
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
                throw;
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

                throw;
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
                throw;
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

                throw;
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
                                   UserRole = context.UserRoles.SingleOrDefault(ur=> ur.UserId == user.Id).RoleId
                               };
                return payments;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<IEnumerable<UpdateUserDTO>> GetMentors()
        {
            try
            {
                //var users = await userManager.GetUsersInRoleAsync(
                //    roleManager.Roles.SingleOrDefault(r => r.Id == roleId.ToString()).NormalizedName);
                var users = await userManager.GetUsersInRoleAsync("Mentor");
                var result = users.Select(u => new UpdateUserDTO
                {
                    Name = $"{u.FirstName} {u.LastName}",
                    Email = u.Email,
                    Status = u.Status
                }); 
                return result;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<IEnumerable<UpdateStudentDTO>> GetStudents()
        {
            try
            {
                var users = await userManager.GetUsersInRoleAsync("Student");
                var result = users.Select(u => new UpdateStudentDTO
                {
                    Name = $"{u.FirstName} {u.LastName}",
                    Email = u.Email,
                    Status = u.Status
                });
                return result;
            }
            catch (Exception e)
            {
                throw;
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
                throw;
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

                throw;
            }
        }
    }
}
