using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace MOD.AuthLibrary
{
    public class MODContext: IdentityDbContext
    {
        public MODContext([NotNullAttribute] DbContextOptions options) : base(options) { }

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
    }
}
