using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class AddedSeedDataEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -12,
                column: "UserID",
                value: "77c8faaa-62f2-4993-96b2-48587cba72a3");

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -11,
                column: "UserID",
                value: "77c8faaa-62f2-4993-96b2-48587cba72a3");

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -10,
                column: "UserID",
                value: "77c8faaa-62f2-4993-96b2-48587cba72a3");

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -9,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 38, 29, 33, DateTimeKind.Local).AddTicks(7615));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -8,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 38, 29, 33, DateTimeKind.Local).AddTicks(7612));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -3,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 38, 29, 33, DateTimeKind.Local).AddTicks(7588));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -2,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 38, 29, 33, DateTimeKind.Local).AddTicks(7471));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -1,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 38, 29, 33, DateTimeKind.Local).AddTicks(1293));

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "ID",
                keyValue: "77c8faaa-62f2-4993-96b2-48587cba72a3",
                column: "Registered",
                value: new DateTime(2020, 12, 1, 11, 38, 29, 25, DateTimeKind.Local).AddTicks(65));

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "ID",
                keyValue: "fca0f3e8-dae4-45d9-ad10-345257364235",
                column: "Registered",
                value: new DateTime(2020, 12, 1, 11, 38, 29, 22, DateTimeKind.Local).AddTicks(9167));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -12,
                column: "UserID",
                value: "fca0f3e8-dae4-45d9-ad10-345257364235");

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -11,
                column: "UserID",
                value: "fca0f3e8-dae4-45d9-ad10-345257364235");

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -10,
                column: "UserID",
                value: "fca0f3e8-dae4-45d9-ad10-345257364235");

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -9,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(7222));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -8,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(7219));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -3,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(7191));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -2,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(7049));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -1,
                column: "Time",
                value: new DateTime(2020, 12, 1, 11, 22, 32, 686, DateTimeKind.Local).AddTicks(1161));

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
    }
}
