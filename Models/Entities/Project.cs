namespace PmuMisHub.Models.Entities;

/// <summary>A student or club project hosted on GitHub.</summary>
public class Project
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string RepoUrl { get; set; } = string.Empty;

    public Guid AuthorId { get; set; }
    public User Author { get; set; } = null!;
}
