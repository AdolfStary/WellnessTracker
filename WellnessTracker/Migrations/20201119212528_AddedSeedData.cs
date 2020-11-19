using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class AddedSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -5,
                column: "Name",
                value: "Meal");

            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -4,
                column: "Name",
                value: "Exercise");

            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -2,
                column: "Name",
                value: "BG Reading");

            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -1,
                column: "Name",
                value: "Insulin Injection");

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -10,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Normal" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -9,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Happy" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -8,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Relaxed" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -7,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Energetic" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -6,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Excited" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -5,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Sick" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -4,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Sad" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -3,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Stressed" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -2,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Anxious" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -1,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Tired" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -5,
                column: "Name",
                value: "Insulin Injection");

            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -4,
                column: "Name",
                value: "BG Reading");

            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -2,
                column: "Name",
                value: "Exercise");

            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -1,
                column: "Name",
                value: "Meal");

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -10,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Tired" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -9,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Anxious" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -8,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Stressed" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -7,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Sad" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -6,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { false, "Sick" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -5,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Excited" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -4,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Energetic" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -3,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Relaxed" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -2,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Happy" });

            migrationBuilder.UpdateData(
                table: "status",
                keyColumn: "ID",
                keyValue: -1,
                columns: new[] { "IsPositive", "Name" },
                values: new object[] { true, "Normal" });
        }
    }
}
