using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MOD.AuthService.DTO;
using MOD.SharedLibrary.Models;

namespace MOD.AuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly SignInManager<MODUser> signInManager;
        private readonly UserManager<MODUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;

        public AccountController(
            UserManager<MODUser> userManager,
            SignInManager<MODUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
        }

        private async Task<TokenDTO> GenerateJwtToken(string email, MODUser user)
        {
            var roles = await userManager.GetRolesAsync(user);
            var role = roleManager.Roles.SingleOrDefault(r => r.Name == roles.SingleOrDefault());

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Role, role.Name)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // recommended is 5 min
            var expires = DateTime.Now.AddDays(Convert.ToDouble(configuration["JwtExpireDays"]));
            var token = new JwtSecurityToken(
                configuration["JwtIssuer"],
                configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            var response = new TokenDTO
            {
                Email = email,
                Role = Convert.ToInt32(role.Id),
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
            return response;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (result.Succeeded)
            {
                var appUser = userManager.Users.Single(r => r.Email == model.Email);
                if(appUser.Status)
                {
                    var response = await GenerateJwtToken(model.Email, appUser);
                    return Ok(response);
                }
                else
                {
                    return Unauthorized(new { Message = "You have been blocked by the administrator" });
                }
            }
            return BadRequest(result);
        }

        [Route("logout")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await signInManager.SignOutAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Logout Failed!");
            }
            return Ok(new { Messsage = "Logout successful!" });
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = new MODUser
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.Email,
                Email = model.Email,
                Gender = model.Gender,
                DateOfBirth = model.DateOfBirth,
                PhoneNumber = model.PhoneNumber,
                LinkedInProfile = model.LinkedInProfile,
                Experience = model.Experience
            };
            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // role name
                var roleName = roleManager.Roles.
                    FirstOrDefault(r => r.Id == model.Role.ToString()).NormalizedName;
                var res = await userManager.AddToRoleAsync(user, roleName);
                if (res.Succeeded)
                {
                    return Created("Register",
                        new { Message = "User successfully registered", Email = model.Email, Role = model.Role });
                }
                return BadRequest(res.Errors);
            }
            return BadRequest(result.Errors);
        }

        [Route("getProfile")]
        [HttpGet]
        public async Task<IActionResult> GetProfile([FromQuery] GetProfileDTO getProfileDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                var user = userManager.Users.FirstOrDefault(u => u.Email == getProfileDTO.Email);
                var roles = await userManager.GetRolesAsync(user);
                var roleId = await roleManager.FindByNameAsync(roles.SingleOrDefault());
                if (roleId.Id == getProfileDTO.Role.ToString())
                {
                    var res = new ProfileDTO
                    {
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Role = getProfileDTO.Role,
                        Gender = user.Gender,
                        DateOfBirth = user.DateOfBirth,
                        PhoneNumber = user.PhoneNumber,
                        LinkedInProfile = user.LinkedInProfile,
                        Status = user.Status,
                        Experience = user.Experience
                    };
                    // return newly formatted data as -- res 
                    return Created("getUser",
                           new { Message = "User data obtained successfully!", user = res });
                }
                return NotFound(getProfileDTO);

            }
            catch (Exception e)
            {
                throw e;
            }

        }

        [Route("updateProfile")]
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] ProfileDTO profileDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                var user = userManager.Users.FirstOrDefault(u => u.Email == profileDTO.Email);
                if (user != null)
                {
                    user.FirstName = profileDTO.FirstName;
                    user.LastName = profileDTO.LastName;
                    user.Gender = profileDTO.Gender;
                    user.DateOfBirth = profileDTO.DateOfBirth;
                    user.PhoneNumber = profileDTO.PhoneNumber;
                    user.LinkedInProfile = profileDTO.LinkedInProfile;
                    user.Experience = profileDTO.Experience;
                    var result = await userManager.UpdateAsync(user);
                    if (result.Succeeded)
                    {
                        return Created("Register",
                            new { Message = "User updated successfully registered", user });
                    }
                    return BadRequest(result.Errors);
                }
                return NotFound(profileDTO);
            }
            catch (Exception e)
            {
                throw e;
            }

        }

    }
}