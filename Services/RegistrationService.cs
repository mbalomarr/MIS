using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PmuMisHub.Data;
using PmuMisHub.Models.Entities;
using PmuMisHub.Models.ViewModels;

namespace PmuMisHub.Services;

/// <summary>Outcome of a registration attempt.</summary>
public sealed record RegistrationResult(Guid? MemberId, IReadOnlyDictionary<string, string> FieldErrors)
{
    public bool Succeeded => MemberId is not null;

    public static RegistrationResult Success(Guid id) => new(id, new Dictionary<string, string>());
    public static RegistrationResult Duplicate(IReadOnlyDictionary<string, string> errors) => new(null, errors);
}

/// <summary>Saves new members, enforcing unique PMU IDs and emails.</summary>
public class RegistrationService(AppDbContext db, ILogger<RegistrationService> logger)
{
    private const string DuplicatePmuId = "This PMU Student ID is already registered.";
    private const string DuplicateEmail = "This email is already registered.";

    // SQL Server error numbers for unique index / unique constraint violations.
    private static readonly int[] UniqueViolationNumbers = [2601, 2627];

    public async Task<RegistrationResult> RegisterAsync(RegistrationViewModel form, CancellationToken ct = default)
    {
        var pmuId = form.PmuId.Trim();
        var email = form.Email.Trim().ToLowerInvariant();

        var duplicates = await FindDuplicatesAsync(pmuId, email, ct);
        if (duplicates.Count > 0)
        {
            return RegistrationResult.Duplicate(duplicates);
        }

        var member = new User
        {
            Id = Guid.NewGuid(),
            PmuId = pmuId,
            FullName = string.Join(' ', form.FullName.Split(' ', StringSplitOptions.RemoveEmptyEntries)),
            Email = email,
            Major = form.Major,
            GithubHandle = NormalizeGithubHandle(form.GithubHandle),
            Role = UserRole.Member,
            QrCodeHash = Guid.NewGuid().ToString("N"),
            CreatedAt = DateTime.UtcNow,
        };

        db.Users.Add(member);

        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException ex) when (ex.InnerException is SqlException sql && UniqueViolationNumbers.Contains(sql.Number))
        {
            // Two submissions raced past the duplicate check; the unique index caught it.
            logger.LogInformation("Duplicate registration blocked by unique index for PMU ID {PmuId}.", pmuId);
            db.Entry(member).State = EntityState.Detached;
            return RegistrationResult.Duplicate(await FindDuplicatesAsync(pmuId, email, ct));
        }

        return RegistrationResult.Success(member.Id);
    }

    private async Task<Dictionary<string, string>> FindDuplicatesAsync(string pmuId, string email, CancellationToken ct)
    {
        var existing = await db.Users
            .AsNoTracking()
            .Where(u => u.PmuId == pmuId || u.Email == email)
            .Select(u => new { u.PmuId, u.Email })
            .ToListAsync(ct);

        var errors = new Dictionary<string, string>();
        if (existing.Any(u => u.PmuId == pmuId)) errors[nameof(RegistrationViewModel.PmuId)] = DuplicatePmuId;
        if (existing.Any(u => u.Email == email)) errors[nameof(RegistrationViewModel.Email)] = DuplicateEmail;
        return errors;
    }

    private static string? NormalizeGithubHandle(string? handle)
    {
        var trimmed = handle?.Trim().TrimStart('@');
        return string.IsNullOrEmpty(trimmed) ? null : trimmed;
    }
}
