using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MOD.MentorLibrary.DTO;
using MOD.MentorLibrary.Repository;
using MOD.SharedLibrary.Models;

namespace MOD.MentorServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Mentor")]
    public class MentorController : ControllerBase
    {
        IMentorRepository repository;
        public MentorController(IMentorRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Mentor/GetSkills
        [HttpGet("getSkills/{email}")]
        public async Task<IActionResult> Get(string email)
        {
            try
            {
                var skills = await repository.GetSkills(email);
                return Ok(new { Message = "Requested successful!", Skills = skills });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.InnerException.InnerException.ToString() });
            }
        }

        // GET: api/Mentor/5
        [HttpGet("getSkillData")]
        public IActionResult GetSkill([FromQuery] string email, int techId)
        {
            try
            {
                var skill = repository.GetSkill(email, techId);
                if(skill != null)
                {
                    return Ok(new { Message = "Request successful!", skill = skill });
                }
                return NotFound(new { Message = "Skill not found" });
            }
            catch (Exception e)
            {
                return BadRequest(e);

            }
        }

        // GET: api/Mentor/5
        [HttpGet("getMentorNotifications/{email}")]
        public IActionResult GetNotifications(string email)
        {
            try
            {
                var notifications = repository.GetNotifications(email);
                if (notifications != null)
                {
                    return Ok(new { Message = "Request successful!", Notifications = notifications });
                }
                return NotFound(new { Message = "No notifications" });
            }
            catch (Exception e)
            {
                return BadRequest(e);

            }
        }

        // GET: api/Mentor/5
        [HttpGet("getTechnologies", Name = "GetTechnologies")]
        public IActionResult GetTechnologes()
        {
            try
            {
                var technologies = repository.GetTechnologies();
                return Ok(new { Courses = technologies });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.InnerException.InnerException.ToString() });
            }
        }

        // GET: api/Mentors
        [HttpGet("getPayments/{email}")]
        public IActionResult GetPayments(string email)
        {
            try
            {
                var payments = repository.GetPayments(email);
                return Ok(new { Payments = payments });
            }
            catch (Exception e)
            {
                return BadRequest(new { e.InnerException.Message });
            }
        }

        // POST: api/Mentor/AddSkill
        [HttpPost("addSkill")]
        public IActionResult Post([FromBody] MentorSkillAddDTO addSkillDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = repository.AddSkill(addSkillDTO);
                if (result.Result == 1)
                {
                    return Created("AddSkill", new { Message = $"{addSkillDTO.Name} added to your skills successfully" });
                }
                else if(result.Result == 3)
                {
                    return BadRequest(new
                    {
                        Message = $"Duplicate skill entry, {addSkillDTO.Name} is already added to your skills. Check My Skills."
                    });
                }
                return BadRequest(result);
            }
            catch (Exception e)
            {                
                return BadRequest(e);
            }
        }

        // POST: api/Mentor/AddSkill
        [HttpPost("updateCourseStatus")]
        public IActionResult updateCourse([FromBody] MentorUpdateCourseDTO mentorUpdateCourseDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = repository.UpdateCourseStatus(mentorUpdateCourseDTO);
                if (result == 1)
                {
                    return Created("UpdateCourseStatus", new { Message = "Course status updated successfully" });
                }
                else if(result == 3 || result == 4)
                {
                    return BadRequest(new { Message = "Invalid action" });
                }
                else if(result == 4)
                {
                    return BadRequest(new { Message = "You are not authorized for this action." });
                }
                return BadRequest(new { Message = "Internal server error. Try again later" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // PUT: api/Mentor/DeleteSkill/5
        [HttpDelete("deleteSkill")]
        public IActionResult DeleteSkill([FromQuery] int skillId, [FromQuery] string email)
        {
            try
            {
                var result = repository.DeleteSkill(skillId, email);
                if (result)
                {
                    return Ok(new { Message = "Skill deleted successfully." });
                }
                return BadRequest(new { Message = "Internal server error. Please try again later." });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.InnerException.InnerException.ToString() });
            }
        }

        // PUT: api/Mentor/UpdateSkill/5
        [HttpPut("updateSkill")]
        public IActionResult Put([FromBody] MentorSkillAddDTO mentorSkillUpdateDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = repository.UpdateSkill(mentorSkillUpdateDTO);
                if (result.Result)
                {
                    return Created("UpdateSkill", new { Message = $"{mentorSkillUpdateDTO.Name} updated successfully" });
                }
                return BadRequest(new { Error = result, Message = $"Failed to update, {mentorSkillUpdateDTO.Name}. Please try again later!" });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = $"Failed to update, {mentorSkillUpdateDTO.Name}. Please try again later!" });
            }
        }
    }
}
