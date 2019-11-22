using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MOD.SharedLibrary.Models;
using System;
using System.Diagnostics.CodeAnalysis;

namespace MOD.AdminLibrary
{
    public class AdminContext: IdentityDbContext
    {
        public AdminContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        // TODO: to be implemented in case of skill or course
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>(r => r.HasData(
                new IdentityRole { Id = "1", Name = "Admin", NormalizedName = "Admin" },
                new IdentityRole { Id = "2", Name = "Mentor", NormalizedName = "Mentor" },
                new IdentityRole { Id = "3", Name = "Student", NormalizedName = "Student" }
            ));
            base.OnModelCreating(builder);
        }

        public DbSet<MODUser> MODUsers { get; set; }
        public DbSet<Technology> Technologies { get; set; }
        public DbSet<MentorSkill> MentorSkills { get; set; }
        public DbSet<StudentCourse> StudentCourses { get; set; }
        public DbSet<Payment> Payments { get; set; }        
    }
}
