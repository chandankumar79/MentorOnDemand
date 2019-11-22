using MOD.MentorLibrary.DTO;
using MOD.SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.MentorLibrary.Repository
{
    public interface IMentorRepository
    {
        public Task<IEnumerable<MentorSkillGetDTO>> GetSkills(string email);
        public MentorSkillGetDTO GetSkill(string email, int techId);
        public IEnumerable<MentorGetNotifications> GetNotifications(string email);
        public Task<int> AddSkill(MentorSkillAddDTO mentorSkillAddDTO);
        public int UpdateCourseStatus(MentorUpdateCourseDTO mentorUpdateCourseDTO);
        public Task<bool> UpdateSkill(MentorSkillAddDTO updateSkillDTO);
        public IEnumerable<Technology> GetTechnologies();
        public IEnumerable<Payment> GetPayments(string email);        
        public bool DeleteSkill(int id, string email);
    }
}
