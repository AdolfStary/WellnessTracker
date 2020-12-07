using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class AddedSeedDataUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "ID", "IsDiabetic", "Password", "Registered", "Username" },
                values: new object[] { "fca0f3e8-dae4-45d9-ad10-345257364235", true, "6346c10aad3dd848f542060024022522ac86f9d7e13dbf39bb8a2252228c794e", new DateTime(2020, 12, 7, 9, 28, 46, 703, DateTimeKind.Local).AddTicks(3191), "Adolf" });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "ID", "IsDiabetic", "Password", "Registered", "Username" },
                values: new object[] { "77c8faaa-62f2-4993-96b2-48587cba72a3", false, "a7b5c820d7a015504cb09776d23899e3f1e392e349916329a70ce3562d38565f", new DateTime(2020, 12, 7, 9, 28, 46, 705, DateTimeKind.Local).AddTicks(4001), "Ummer" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "user",
                keyColumn: "ID",
                keyValue: "77c8faaa-62f2-4993-96b2-48587cba72a3");

            migrationBuilder.DeleteData(
                table: "user",
                keyColumn: "ID",
                keyValue: "fca0f3e8-dae4-45d9-ad10-345257364235");
        }
    }
}
