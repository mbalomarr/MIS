using System.ComponentModel.DataAnnotations;

namespace PmuMisHub.Models.ViewModels;

/// <summary>
/// The /join form. DataAnnotations drive both server-side validation and
/// (via jQuery unobtrusive validation) the instant browser-side messages.
/// Uniqueness of PMU ID and email is checked against the database in the controller.
/// </summary>
public class RegistrationViewModel
{
    public static readonly IReadOnlyList<string> Majors =
    [
        "Management Information Systems",
        "Accounting",
        "Finance",
        "Business Administration",
        "Marketing",
        "Computer Science",
        "Computer Engineering",
        "Law",
        "Interior Design",
        "Other",
    ];

    public const string PmuEmailDomain = "@pmu.edu.sa";

    [Required(ErrorMessage = "Please enter your full name.")]
    [StringLength(120, MinimumLength = 3, ErrorMessage = "Please enter your full name.")]
    [RegularExpression(@"^\s*\S+(\s+\S+)+\s*$", ErrorMessage = "Please include your first and last name.")]
    [Display(Name = "Full name")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please enter your PMU Student ID.")]
    [RegularExpression(@"^\d{9,10}$", ErrorMessage = "Your PMU Student ID should be 9 or 10 digits.")]
    [Display(Name = "PMU Student ID")]
    public string PmuId { get; set; } = string.Empty;

    [Required(ErrorMessage = "Select your major.")]
    [Display(Name = "Major")]
    public string Major { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please enter your PMU email.")]
    [StringLength(180)]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    // Character classes instead of a case-insensitive flag, so the same pattern works in browser validation.
    [RegularExpression(@"^\s*[^@\s]+@[pP][mM][uU]\.[eE][dD][uU]\.[sS][aA]\s*$", ErrorMessage = "Use your PMU email (@pmu.edu.sa).")]
    [Display(Name = "PMU email")]
    public string Email { get; set; } = string.Empty;

    /// <summary>Optional. GitHub rules: 1–39 chars, letters/digits/single hyphens, no leading/trailing hyphen.</summary>
    [RegularExpression(@"^@?[A-Za-z\d](?:[A-Za-z\d]|-(?=[A-Za-z\d])){0,38}$", ErrorMessage = "That doesn't look like a GitHub username.")]
    [Display(Name = "GitHub username")]
    public string? GithubHandle { get; set; }

    /// <summary>Honeypot: hidden from people, filled by bots. Must stay empty.</summary>
    public string? Website { get; set; }
}
