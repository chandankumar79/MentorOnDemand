﻿using JetBrains.Annotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MOD.SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace MOD.MentorLibrary
{
    public class MentorContext: DbContext
    {
        public MentorContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        public DbSet<MODUser> MODUsers { get; set; }
        public DbSet<Technology> Technologies { get; set; }
        public DbSet<MentorSkill> MentorSkills { get; set; }
        public DbSet<StudentCourse> StudentCourses { get; set; }
        public DbSet<Payment> Payments { get; set; }

    }
}
