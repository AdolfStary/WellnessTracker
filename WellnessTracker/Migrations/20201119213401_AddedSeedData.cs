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
                    { -5, "Meal" },
                    { -4, "Exercise" },
                    { -3, "Event" },
                    { -2, "BG Reading" },
                    { -1, "Insulin Injection" }
                });

            migrationBuilder.InsertData(
                table: "status",
                columns: new[] { "ID", "IsPositive", "Name" },
                values: new object[,]
                {
                    { -10, true, "Normal" },
                    { -9, true, "Happy" },
                    { -8, true, "Relaxed" },
                    { -7, true, "Energetic" },
                    { -6, true, "Excited" },
                    { -5, false, "Sick" },
                    { -4, false, "Sad" },
                    { -3, false, "Stressed" },
                    { -2, false, "Anxious" },
                    { -1, false, "Tired" }
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
