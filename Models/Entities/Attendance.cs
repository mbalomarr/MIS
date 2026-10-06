namespace PmuMisHub.Models.Entities;

/// <summary>Junction entity: one row per member checked in to an event via QR scan.</summary>
public class Attendance
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public Guid EventId { get; set; }
    public Event Event { get; set; } = null!;

    public DateTime ScannedAt { get; set; }
}
