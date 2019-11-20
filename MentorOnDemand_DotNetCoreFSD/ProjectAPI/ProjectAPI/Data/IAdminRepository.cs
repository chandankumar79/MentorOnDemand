using ProjectAPI.DTO;
using ProjectAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.Data
{
    public interface IAdminRepository
    {
        public Task<bool> AddTechAsync(TechnologyDTO technologyDTO);
        public IEnumerable<Technology> GetTechnologies();
        public IEnumerable<AdminGetPaymentsDTO> GetPayments();
        public Task<Technology> GetTechById(int id);
        public bool UpdateTech(UpdateTechDTO updatedTechDTO);
        public Task<bool> DeleteTechAsync(Technology technology);
        public Task<IEnumerable<UpdateUserDTO>> GetMentors();
        public Task<IEnumerable<UpdateStudentDTO>> GetStudents();
        public Task<bool> UpdateUserStatus(UpdateUserStatusDTO updateUserStatus);

    }
}
