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
| `Database/InitialCreate.sql` | Idempotent SQL script for creating the schema by hand |

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

1. Create a SQL Server database in the Monster ASP control panel and note its server, database name, user and password.
2. Create the schema: either run `Database/InitialCreate.sql` in the panel's SQL tool, or run `dotnet ef database update --connection "<connection string>"` from your machine.
3. Copy `appsettings.Production.json.example` to `appsettings.Production.json` and fill in the connection string (this file is git-ignored).
4. Publish: `dotnet publish -c Release -o publish`, then upload the contents of `publish/` (including `web.config` and `appsettings.Production.json`) via FTP or Web Deploy.

Regenerate the SQL script after adding a migration:

```bash
dotnet ef migrations script --idempotent -o Database/InitialCreate.sql
```
