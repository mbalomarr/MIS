namespace PmuMisHub.Models.ViewModels;

/// <summary>What the Digital ID page shows. Only the fields printed on the card.</summary>
public class IdCardViewModel
{
    public required Guid Id { get; init; }
    public required string FullName { get; init; }
    public required string PmuId { get; init; }
    public required string Major { get; init; }
    public string? GithubHandle { get; init; }
    public required DateTime MemberSince { get; init; }

    /// <summary>The secret the QR code encodes for event check-in.</summary>
    public required string QrCodeHash { get; init; }

    /// <summary>True right after registering, to show the welcome banner.</summary>
    public bool JustRegistered { get; init; }
}
