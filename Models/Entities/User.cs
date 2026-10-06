namespace PmuMisHub.Models.Entities;

/// <summary>A registered MIS Club member (or admin).</summary>
public class User
{
    public Guid Id { get; set; }

    /// <summary>PMU student ID, 9–10 digits. Unique.</summary>
    public string PmuId { get; set; } = string.Empty;

    public string FullName { get; set; } = string.Empty;

    /// <summary>PMU email address (@pmu.edu.sa), stored lowercase. Unique.</summary>
    public string Email { get; set; } = string.Empty;

    public string Major { get; set; } = string.Empty;

    public string? GithubHandle { get; set; }

    public UserRole Role { get; set; } = UserRole.Member;

    /// <summary>Random secret encoded in the member's QR code for event check-in. Unique.</summary>
    public string QrCodeHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();

    public ICollection<Project> Projects { get; set; } = new List<Project>();
}
