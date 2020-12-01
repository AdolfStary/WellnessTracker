using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class AddedSeedDataEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "entry",
                columns: new[] { "ID", "BG", "Carbs", "CategoryID", "ExerciseLength", "Fats", "Insulin", "IsArchived", "Notes", "Protein", "StatusID", "Time", "UserID" },
                values: new object[,]
                {
                    { -1, 9.4000000000000004, 40, -5, 0, 15, 2.5, false, "Feeling pretty good today, had Eggs and toast for breakfast.", 20, -10, new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(1161), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -2, 7.7999999999999998, 20, -5, 0, 35, 1.25, false, "Went out for dinner, had chicken and potatoes.", 50, -8, new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(7049), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -3, 0.0, 0, -4, 50, 0, 0.0, false, "Hardcore exercise", 0, -10, new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(7191), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -4, 0.0, 0, -4, 20, 0, 0.0, false, "Starting to exercise, taking it easy", 0, -10, new DateTime(2020, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -5, 5.5999999999999996, 0, -3, 0, 0, 0.0, false, "Got a new job, pretty awesome", 0, -6, new DateTime(2020, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -6, 3.7000000000000002, 0, -2, 0, 0, 0.0, false, "Felt strange, tested blood sugar, low reading", 0, -2, new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -7, 19.800000000000001, 0, -1, 0, 0, 2.2000000000000002, false, "Felt very exhausted, tested blood sugar, high reading, took correction", 0, -1, new DateTime(2020, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -8, 0.0, 80, -5, 0, 28, 0.0, false, "Endluged in some fast food after excercising", 33, -10, new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(7219), "77c8faaa-62f2-4993-96b2-48587cba72a3" },
                    { -9, 0.0, 20, -5, 0, 35, 0.0, false, "I'm stressed, running out of bacon. Gotta go shopping soon.", 45, -2, new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(7222), "77c8faaa-62f2-4993-96b2-48587cba72a3" },
                    { -10, 0.0, 0, -4, 60, 0, 0.0, false, "Regular exercise, bench, legs, running", 0, -7, new DateTime(2020, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -11, 0.0, 0, -3, 0, 0, 0.0, false, "Found awesome new exercise: https://www.verywellfit.com/the-plank-exercise-3120068", 0, -6, new DateTime(2020, 11, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "fca0f3e8-dae4-45d9-ad10-345257364235" },
                    { -12, 0.0, 0, -4, 15, 0, 0.0, false, "Tried the new plank exercise, pretty brutal", 0, -1, new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "fca0f3e8-dae4-45d9-ad10-345257364235" }
                });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "ID",
                keyValue: "77c8faaa-62f2-4993-96b2-48587cba72a3",
                column: "Registered",
                value: new DateTime(2020, 12, 1, 11, 22, 32, 678, DateTimeKind.Local).AddTicks(375));

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "ID",
                keyValue: "fca0f3e8-dae4-45d9-ad10-345257364235",
                column: "Registered",
                value: new DateTime(2020, 12, 1, 11, 22, 32, 675, DateTimeKind.Local).AddTicks(9627));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -12);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -11);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -10);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -9);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -8);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -7);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -6);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -5);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -4);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -3);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -1);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "ID",
                keyValue: "77c8faaa-62f2-4993-96b2-48587cba72a3",
                column: "Registered",
                value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "ID",
                keyValue: "fca0f3e8-dae4-45d9-ad10-345257364235",
                column: "Registered",
                value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
