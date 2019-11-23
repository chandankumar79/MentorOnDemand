using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MOD.StudentLibrary.DTO;
using MOD.StudentLibrary.Repository;

namespace MOD.StudentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Student")]
    public class StudentController : ControllerBase
    {
        IStudentRepository repository;
        public StudentController(IStudentRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Student/
        [HttpGet("getCourses/{email}")]
        public IActionResult GetCourses(string email)
        {
            try
            {
                var courses = repository.GetCourses(email);
                return Ok(new { Message = "GetCourses Request Successful.", Courses = courses });
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException);
            }
        }        

        // GET: api/Admin
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

        // GET: api/Admin
        [HttpGet("getTechnologies")]
        [AllowAnonymous]
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

        [HttpGet("search/{searchString}")]
        [AllowAnonymous]
        public IActionResult Search(string searchString)
        {
            try
            {
                var courses = repository.SearchCourses(searchString);
                return Ok(new { Courses = courses });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // GET: api/Student/GetCourseMentors
        [HttpGet("getCourseMentors/{techId}")]
        [AllowAnonymous]
        public IActionResult GetCourseMentors(int techId)
        {
            try
            {
                var mentors = repository.GetCourseMentors(techId);
                return Ok(new { Message = "GetCourseMentors Request Successful.", Mentors = mentors });
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException);
            }
        }

        // POST: api/Student
        [HttpPost("addCourse")]
        public IActionResult AddCourse([FromBody] StudentCourseAddDTO courseAddDTO)
        {
            try
            {
                var result = repository.AddCourse(courseAddDTO);
                if(result == 1)
                {
                    return Ok(new { Message = "Successfully applied for the course. Check my courses." });
                }
                else if(result == 3)
                {
                    return Conflict(new { Message = "You have already applied for this course. Check my courses." });
                }
                else if(result == 4)
                {
                    return BadRequest(new { Message = "You must be logged in as a student to apply for courses." });
                }
                else
                {
                    return BadRequest(new { Message = "Internal server error. Try again later." });
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException);
            }

        }

        // POST: api/Student
        [HttpPut("updateCourseCancel/{email}")]
        public IActionResult CancelCourse(string email, [FromBody] int courseId)
        {
            try
            {
                var result = repository.CancelCourse(email, courseId);
                if (result == 1)
                {
                    return Ok(new { Message = "Course cancelled successfully." });
                }
                else if (result == 3)
                {
                    return NotFound(new { Message = "Error: Course not found!" });
                }
                else if(result == 4)
                {
                    return Conflict(new { Message = "Action cannot be completed. Either the course is already complete or has been rejected by Mentor." });
                }
                return BadRequest(new { Message = "Internal server error. Try again later." });
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException);
            }

        }

        // PUT: api/Student/5
        [HttpPut("updateMentorRating")]
        public IActionResult updateCourseRating([FromBody] StudentCourseRatingDTO courseRatingDTO)
        {
            try
            {
                // TODO: also add the rating to mentor table
                var result = repository.UpdateCourseRating(courseRatingDTO);
                if (result == 1)
                {
                    return Ok(new { Message = "Rating submitted successfully." });
                }
                else if (result == 3)
                {
                    return NotFound(new { Message = "Error: Course not found!" });
                }
                else if (result == 4)
                {
                    return Conflict(new { Message = "Action cannot be completed. Either the course is already complete or has been rejected by Mentor." });
                }
                else if(result == 5)
                {
                    return BadRequest(new { Message = "The course is still ongoing. You must complete the course to rate mentor." });
                }
                return BadRequest(new { Message = "Internal server error. Try again later." });
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException);
            }

        }

        // PUT: api/Student/5
        [HttpPut("updateCoursePayment")]
        public IActionResult UpdateCoursePayment([FromBody] StudentCourseUpdatePaymentDTO updatePaymentDTO)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var result = repository.UpdateCoursePayment(updatePaymentDTO);
                    if(result == 1)
                    {
                        return Ok(new { Message = "Payment successful!" });
                    }
                    else if(result == 3)
                    {
                        return NotFound(new { Message = "Error: Course not found!" });
                    }
                    else if(result == 4)
                    {
                        return Conflict(new { Message = "Payment for this course has already been completed." });
                    }
                    else if( result == 5)
                    {
                        return Conflict(new { Message = "Unable to process request. You have either cancelled the course or request has been rejeted by mentor." });
                    }
                    return BadRequest(new { Message = "An error occurred while processing payment. Please try again later." });
                }
                return BadRequest(new { Message = "Invalid action. Try again." });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = "Internal server error.", error = e.InnerException });
            }
        }

        // PUT: api/Student/5
        [HttpPut("updateCourseProgress")]
        public IActionResult updateCourseProgress([FromBody] StudentCourseProgressDTO courseProgressDTO)
        {
            try
            {
                // TODO: also add the rating to mentor table
                var result = repository.UpdateCourseProgress(courseProgressDTO);
                if (result == 1)
                {
                    return Ok(new { Message = "Progress updated successfully!" });
                }
                else if (result == 3)
                {
                    return NotFound(new { Message = "Error: Course not found!" });
                }
                else if (result == 4)
                {
                    return Conflict(new { Message = "Action cannot be completed. Course is already complete or is not ongoing." });
                }
                return BadRequest(new { Message = "Internal server error. Try again later." });
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException);
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
