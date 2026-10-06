using PmuMisHub.Models.Entities;

namespace PmuMisHub.Content;

public sealed record Pillar(string Icon, string Title, string Description, IReadOnlyList<string> Tools);

public sealed record ShowcaseEvent(DateOnly Date, EventType Type, string Title, string Description, string Location, string Time, string Capacity);

public sealed record ShowcaseProject(string Title, string Description, IReadOnlyList<string> Stack, string Status, string? RepoUrl);

/// <summary>
/// Site-wide settings and homepage copy, carried over from the original
/// index.html. Views read from here so text changes never touch markup.
/// </summary>
public static class SiteContent
{
    public const string Name = "PMU MIS Hub";
    public const string University = "Prince Mohammad Bin Fahd University";
    public const string UniversityShort = "PMU";
    public const string ClubName = "MIS Club";
    public const string Email = "misclub@pmu.edu.sa";
    public const string Location = "Prince Mohammad Bin Fahd University, Al Khobar";
    public const string GithubRepo = "https://github.com/mbalomarr/MIS";
    public const string Instagram = "https://www.instagram.com/misclub.pmu";
    public const string UniversityUrl = "https://www.pmu.edu.sa";

    public const string Description =
        "The hub for the Management Information Systems major at Prince Mohammad Bin Fahd University and the official website of the MIS Student Club — bridging strategic business management and innovative technology.";

    public static readonly IReadOnlyList<Pillar> Pillars =
    [
        new("layout-grid", "System Analysis & Product",
            "Requirement gathering, user stories, and turning business needs into technical specs — practiced on real platforms and marketplaces, not textbook exercises.",
            []),
        new("code-xml", "Technical Skills & Tools",
            "Business automation, database design, AI agents and conversational bots, plus network fundamentals in Cisco Packet Tracer.",
            ["Python", "C#", "SQL", "ASP.NET"]),
        new("graduation-cap", "Career Readiness",
            "Co-op and internship preparation for competitive roles in regional tech and energy companies, professional branding, and guest sessions with working alumni.",
            []),
    ];

    public static readonly IReadOnlyList<ShowcaseEvent> Events =
    [
        new(new DateOnly(2026, 9, 24), EventType.Bootcamp, "Python for Business Automation — Day 1",
            "Hands-on session automating administrative workflows: reading spreadsheets, generating reports and scheduling scripts. No prior coding required.",
            "Building 5 · Lab 204", "4:00 – 7:00 PM", "30 seats"),
        new(new DateOnly(2026, 10, 2), EventType.Talk, "Inside an ERP Rollout: Lessons from the Field",
            "An alumnus working in IT consulting walks through a real enterprise system implementation — the requirements, the resistance, and what actually shipped.",
            "Main Auditorium", "6:00 – 7:30 PM", "Open to all majors"),
        new(new DateOnly(2026, 10, 15), EventType.Bootcamp, "Database Design & MySQL Workshop",
            "From ER diagram to working schema. Normalisation, keys, indexes and writing the queries that answer real business questions.",
            "Building 5 · Lab 204", "4:00 – 7:00 PM", "30 seats"),
    ];

    public static readonly IReadOnlyList<ShowcaseProject> Projects =
    [
        new("MIS Club Portal",
            "This website: the hub for the MIS major and the MIS Club, built with ASP.NET Core MVC, Entity Framework Core and SQL Server.",
            ["ASP.NET Core", "EF Core", "SQL Server"], "Live", GithubRepo),
        new("QR Attendance System",
            "Event check-in by scanning each member's Digital ID QR code, so attendance is recorded in seconds.",
            ["ASP.NET Core", "EF Core", "QR"], "Planned", null),
        new("Digital Member ID",
            "A digital membership card for every registered member, used for event check-in and priority registration.",
            ["Razor", "Tailwind", "QR"], "Live", GithubRepo),
    ];

    public static readonly IReadOnlyList<string> JoinPerks =
    [
        "Priority seats at bootcamps and hackathons",
        "Project teams and portfolio-worthy work on GitHub",
        "Co-op and internship referral network",
        "Direct access to alumni and industry guests",
        "A digital member ID with a QR code for event check-in",
    ];

    public static string EventLabel(EventType type) => type switch
    {
        EventType.Bootcamp => "Bootcamp",
        EventType.Talk => "Tech Talk",
        EventType.Competition => "Competition",
        _ => type.ToString(),
    };
}
