using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class ModifiedCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDiabetic",
                table: "category",
                type: "bool",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -2,
                column: "IsDiabetic",
                value: true);

            migrationBuilder.UpdateData(
                table: "category",
                keyColumn: "ID",
                keyValue: -1,
                column: "IsDiabetic",
                value: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDiabetic",
                table: "category");
        }
    }
}
