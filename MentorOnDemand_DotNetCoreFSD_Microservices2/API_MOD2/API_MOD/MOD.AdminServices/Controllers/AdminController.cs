using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MOD.AdminLibrary.DTO;
using MOD.AdminLibrary.Repository;

namespace MOD.AdminServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        IAdminRepository repository;
        public AdminController(IAdminRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Admin
        [HttpGet("getTechnologies")]
        public IActionResult Get()
        {
            try
            {
                var technologies = repository.GetTechnologies();
                return Ok(new { Courses = technologies });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("getDashboardData")]
        public IActionResult getDashboardData()
        {
            try
            {
                var dashboardData = repository.GetDashboard().Result;
                return Ok(new { dashboardData });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        // GET: api/Admin
        [HttpGet("getPayments")]
        public IActionResult GetPayments()
        {
            try
            {
                var payments = repository.GetPayments();
                return Ok(new { Payments = payments });
            }
            catch (Exception e)
            {
                return BadRequest(new { e.InnerException.Message });
            }
        }

        // GET: api/Admin/5
        [HttpGet("GetTechById/{id}", Name = "GetTechById")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var tech = await repository.GetTechById(id);
                if (tech == null)
                {
                    return NotFound();
                }
                return Ok(new { Tech = tech });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // POST: api/Admin/AddTech
        [Route("addTech")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TechnologyDTO technologyDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bool result = await repository.AddTechAsync(technologyDTO);
            if (result)
            {
                return Created("AddTech", new { Message = "Technology added successfully" });
            }
            return BadRequest(result);
        }

        // PUT: api/Admin/UpdateTech
        [HttpPut("updateTech/{id}")]
        public IActionResult Put(int id, [FromBody] UpdateTechDTO updatedTechDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = repository.UpdateTech(updatedTechDTO);
            if (result)
            {
                return Created("UpdateTech", new { Message = "Technology updated successfully", Data = updatedTechDTO });
            }
            return BadRequest(result);

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("deleteTech/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var tech = repository.GetTechById(id);
            if (tech == null)
            {
                return NotFound();
            }
            var result = await repository.DeleteTechAsync(tech.Result);
            if (result)
            {
                return Created("DeleteTech", "Technology deleted successfully");
            }
            return BadRequest(result);
        }

        // GET: api/Admin/GetMentors
        [HttpGet("getMentors")]
        public async Task<IActionResult> GetMentors()
        {
            try
            {
                var users = await repository.GetMentors();
                return Ok(new { mentors = users });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // GET: api/Admin/GetMentors
        [HttpGet("getStudents")]
        public async Task<IActionResult> GetStudents()
        {
            try
            {
                var users = await repository.GetStudents();
                return Ok(new { students = users });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // PUT: api/Admin/UpdateUser
        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserStatusDTO updateUserStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bool result = await repository.UpdateUserStatus(updateUserStatus);
            if (result)
            {
                return Created("UpdateUser", new { Message = "User status updated successfully" });
            }
            return BadRequest(result);
        }
    }
}
