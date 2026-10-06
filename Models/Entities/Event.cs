namespace PmuMisHub.Models.Entities;

/// <summary>A club event: workshop, tech talk or competition.</summary>
public class Event
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public string Location { get; set; } = string.Empty;

    public EventType Type { get; set; }

    /// <summary>Maximum attendees; null means open attendance.</summary>
    public int? Capacity { get; set; }

    public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
}
