using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class AddedSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "category",
                columns: new[] { "ID", "Name" },
                values: new object[,]
                {
                    { -1, "Meal" },
                    { -2, "Exercise" },
                    { -3, "Event" },
                    { -4, "BG Reading" },
                    { -5, "Insulin Injection" }
                });

            migrationBuilder.InsertData(
                table: "status",
                columns: new[] { "ID", "IsPositive", "Name" },
                values: new object[,]
                {
                    { -1, true, "Normal" },
                    { -2, true, "Happy" },
                    { -3, true, "Relaxed" },
                    { -4, true, "Energetic" },
                    { -5, true, "Excited" },
                    { -6, false, "Sick" },
                    { -7, false, "Sad" },
                    { -8, false, "Stressed" },
                    { -9, false, "Anxious" },
                    { -10, false, "Tired" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -5);

            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -4);

            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -3);

            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -1);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -10);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -9);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -8);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -7);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -6);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -5);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -4);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -3);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "status",
                keyColumn: "ID",
                keyValue: -1);
        }
    }
}
