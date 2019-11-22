using MOD.AdminLibrary.DTO;
using MOD.SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AdminLibrary.Repository
{
    public interface IAdminRepository
    {
        public Task<bool> AddTechAsync(TechnologyDTO technologyDTO);
        public IEnumerable<Technology> GetTechnologies();
        public Task<AdminDashboardDTO> GetDashboard();
        public IEnumerable<AdminGetPaymentsDTO> GetPayments();
        public Task<Technology> GetTechById(int id);
        public bool UpdateTech(UpdateTechDTO updatedTechDTO);
        public Task<bool> DeleteTechAsync(Technology technology);
        public Task<IEnumerable<AdminGetMentorsDTO>> GetMentors();
        public Task<IEnumerable<AdminGetStudents>> GetStudents();
        public Task<bool> UpdateUserStatus(UpdateUserStatusDTO updateUserStatus);

    }
}
