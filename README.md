# PMU MIS Hub

The hub for the Management Information Systems major at Prince Mohammad Bin Fahd University and the official website of the MIS Club.

**Stack:** ASP.NET Core 8 MVC · Entity Framework Core 8 · SQL Server · Razor views with Tailwind CSS (browser build) and Lucide icons · hosted on Monster ASP (IIS).

## Project layout

| Path | What lives there |
|---|---|
| `Controllers/HomeController.cs` | Homepage, `/join` (GET/POST) and the Digital ID at `/id/{id}` |
| `Services/RegistrationService.cs` | Saves members; enforces unique PMU ID and email |
| `Data/AppDbContext.cs` | EF Core model: tables, relationships, unique indexes |
| `Models/Entities/` | `User`, `Event`, `Attendance`, `Project` |
| `Models/ViewModels/` | Form and page models (validation rules are DataAnnotations here) |
| `Content/SiteContent.cs` | Site settings and homepage copy |
| `Views/` | Razor views; homepage sections are partials in `Views/Home/Sections/` |
| `Migrations/` | EF Core migrations |
| `Database/MonsterAspMigration.sql` | Idempotent SQL script for creating the schema in Monster ASP |
| `publish.sh` / `publish.bat` | Build the Release package into `publish/` |
| `appsettings.Production.template.json` | Template for the git-ignored `appsettings.Production.json` |

## Run locally

Requires the .NET 8 SDK and a SQL Server (on macOS, run SQL Server in Docker).

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost,1433;Database=PmuMisHub_Dev;User Id=sa;Password=<your-password>;TrustServerCertificate=True;MultipleActiveResultSets=True"
dotnet tool restore
dotnet ef database update
dotnet run
```

## Deploy to Monster ASP

1. **Database:** create a SQL Server database in the Monster ASP control panel and note its server, database name, user and password.
2. **Schema:** open the panel's SQL query tool, paste the whole of `Database/MonsterAspMigration.sql` and run it once. It is safe to run again later.
3. **Settings:** copy `appsettings.Production.template.json` to `appsettings.Production.json` (git-ignored) and fill in the connection string.
4. **Package:** run `./publish.sh` (macOS/Linux) or `publish.bat` (Windows). It warns if the production settings still contain placeholders.
5. **Upload:** copy the contents of `publish/` into the site root via FTP or Web Deploy.

After adding a migration, regenerate the SQL script (then remove the `GO` lines, or keep them if you only use SSMS):

```bash
dotnet ef migrations script --idempotent -o Database/MonsterAspMigration.sql
```
