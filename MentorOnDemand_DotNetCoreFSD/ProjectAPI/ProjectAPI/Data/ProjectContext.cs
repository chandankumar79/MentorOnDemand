using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjectAPI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.Data
{
    public class ProjectContext : IdentityDbContext
    {
        public ProjectContext([NotNullAttribute] DbContextOptions options) : base(options) { }

        // TODO: to be implemented in case of skill or course
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Entity<MovieActors>().HasKey(ma => new { ma.MovieId, ma.ActorId });
            builder.Entity<IdentityRole>(r => r.HasData(
                new IdentityRole { Id = "1", Name = "Admin", NormalizedName = "Admin" },
                new IdentityRole { Id = "2", Name = "Mentor", NormalizedName = "Mentor" },
                new IdentityRole { Id = "3", Name = "Student", NormalizedName = "Student" }
            ));

            //builder.Entity<MentorSkill>().HasIndex(ms => new { ms.TechId, ms.User });

            base.OnModelCreating(builder);
        }

        public DbSet<MODUser> MODUsers { get; set; }
        public DbSet<Technology> Technologies { get; set; }
        public DbSet<MentorSkill> MentorSkills { get; set; }
        public DbSet<StudentCourse> StudentCourses { get; set; }
    }
}
