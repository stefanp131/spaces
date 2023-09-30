using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Spaces.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddFollowers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Follow_AspNetUsers_SourceUserId",
                table: "Follow");

            migrationBuilder.DropForeignKey(
                name: "FK_Follow_AspNetUsers_TargetUserId",
                table: "Follow");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Follow",
                table: "Follow");

            migrationBuilder.RenameTable(
                name: "Follow",
                newName: "Followers");

            migrationBuilder.RenameIndex(
                name: "IX_Follow_TargetUserId",
                table: "Followers",
                newName: "IX_Followers_TargetUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Follow_SourceUserId",
                table: "Followers",
                newName: "IX_Followers_SourceUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Followers",
                table: "Followers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Followers_AspNetUsers_SourceUserId",
                table: "Followers",
                column: "SourceUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Followers_AspNetUsers_TargetUserId",
                table: "Followers",
                column: "TargetUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AspNetUsers_SourceUserId",
                table: "Followers");

            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AspNetUsers_TargetUserId",
                table: "Followers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Followers",
                table: "Followers");

            migrationBuilder.RenameTable(
                name: "Followers",
                newName: "Follow");

            migrationBuilder.RenameIndex(
                name: "IX_Followers_TargetUserId",
                table: "Follow",
                newName: "IX_Follow_TargetUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Followers_SourceUserId",
                table: "Follow",
                newName: "IX_Follow_SourceUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Follow",
                table: "Follow",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Follow_AspNetUsers_SourceUserId",
                table: "Follow",
                column: "SourceUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Follow_AspNetUsers_TargetUserId",
                table: "Follow",
                column: "TargetUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
