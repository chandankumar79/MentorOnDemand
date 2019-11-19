using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class InitialMigration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MentorSkills",
                columns: table => new
                {
                    SkillId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TechId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    Rating = table.Column<decimal>(nullable: false),
                    RatingsCount = table.Column<int>(nullable: false),
                    SkillSurcharge = table.Column<decimal>(nullable: false),
                    TotalFee = table.Column<decimal>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MentorSkills", x => x.SkillId);
                    table.ForeignKey(
                        name: "FK_MentorSkills_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "061baaa7-14de-408e-87d0-b9e945058443");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "111db778-7026-4a8a-b9d6-b9ed2db04f10");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "996cdc26-4815-442b-af73-71953bfc4847");

            migrationBuilder.CreateIndex(
                name: "IX_MentorSkills_UserId",
                table: "MentorSkills",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MentorSkills");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "48d21d97-5bfc-4345-98bf-aaf62fb9ba70");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "bb5711f5-fb8c-434d-8f89-0a22701719ee");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "3cacd758-5359-4855-ba6b-22da66af63a4");
        }
    }
}
