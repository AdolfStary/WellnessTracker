using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class AddedArchivedPropertyToAllergenEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isArchived",
                table: "Allergen_Entry",
                type: "bool",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -9,
                column: "Time",
                value: new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(8816));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -8,
                column: "Time",
                value: new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(8813));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -3,
                column: "Time",
                value: new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(8787));

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -2,
                columns: new[] { "Notes", "Time" },
                values: new object[] { "Went out for dinner, had chicken, toast and potatoes, big glass of milk.", new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(8675) });

            migrationBuilder.UpdateData(
                table: "entry",
                keyColumn: "ID",
                keyValue: -1,
                column: "Time",
                value: new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(1662));

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "ID",
                keyValue: "77c8faaa-62f2-4993-96b2-48587cba72a3",
                column: "Registered",
                value: new DateTime(2020, 12, 4, 11, 51, 16, 182, DateTimeKind.Local).AddTicks(1416));

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "ID",
                keyValue: "fca0f3e8-dae4-45d9-ad10-345257364235",
                column: "Registered",
                value: new DateTime(2020, 12, 4, 11, 51, 16, 180, DateTimeKind.Local).AddTicks(757));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isArchived",
                table: "Allergen_Entry");

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
                columns: new[] { "Notes", "Time" },
                values: new object[] { "Went out for dinner, had chicken and potatoes.", new DateTime(2020, 12, 1, 11, 38, 29, 33, DateTimeKind.Local).AddTicks(7471) });

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
    }
}
