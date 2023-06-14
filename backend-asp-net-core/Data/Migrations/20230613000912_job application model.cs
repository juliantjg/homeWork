using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_asp_net_core.Data.Migrations
{
    public partial class jobapplicationmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobApplications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Applicant_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Job_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Job_creator_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplications", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobApplications");
        }
    }
}
