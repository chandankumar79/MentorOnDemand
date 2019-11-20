using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class Phase3Migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "MentorSkills");

            migrationBuilder.DropColumn(
                name: "RatingsCount",
                table: "MentorSkills");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "1834cf76-0c07-42b4-ac57-5399fb3bad7b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "81615333-335f-40a5-9c0e-e5a5005b504d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "715c8430-639a-46e7-8a17-6e78e804ca07");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "MentorSkills",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "RatingsCount",
                table: "MentorSkills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "d874255e-3162-4f5a-ab9d-332664131d6a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "5f65ab2e-0e00-46e9-8d1c-9f283729d33f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "8aa49542-5ee7-48ac-8f1b-f30a83e12079");
        }
    }
}
