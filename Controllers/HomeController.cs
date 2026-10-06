using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PmuMisHub.Data;
using PmuMisHub.Models.ViewModels;
using PmuMisHub.Services;

namespace PmuMisHub.Controllers;

public class HomeController(AppDbContext db, RegistrationService registration, ILogger<HomeController> logger) : Controller
{
    private const string JustRegisteredKey = "JustRegistered";

    [HttpGet("/")]
    public IActionResult Index() => View();

    [HttpGet("/join")]
    public IActionResult Join() => View(new RegistrationViewModel());

    [HttpPost("/join")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Join(RegistrationViewModel form, CancellationToken ct)
    {
        // A filled honeypot means a bot: pretend it worked and save nothing.
        if (!string.IsNullOrEmpty(form.Website))
        {
            return RedirectToAction(nameof(Index));
        }

        if (!RegistrationViewModel.Majors.Contains(form.Major))
        {
            ModelState.AddModelError(nameof(form.Major), "Select your major.");
        }

        if (!ModelState.IsValid)
        {
            return View(form);
        }

        try
        {
            var result = await registration.RegisterAsync(form, ct);
            if (!result.Succeeded)
            {
                foreach (var (field, message) in result.FieldErrors)
                {
                    ModelState.AddModelError(field, message);
                }
                return View(form);
            }

            TempData[JustRegisteredKey] = true;
            return RedirectToAction(nameof(Id), new { id = result.MemberId });
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            logger.LogError(ex, "Failed to save registration.");
            ModelState.AddModelError(string.Empty, "We couldn't save your registration right now. Please try again in a moment.");
            return View(form);
        }
    }

    /// <summary>
    /// The member's Digital ID. Addressed by the member's random Guid rather than
    /// their PMU ID, so nobody can look up another student's card (and QR code) by guessing IDs.
    /// </summary>
    [HttpGet("/id/{id:guid}")]
    public async Task<IActionResult> Id(Guid id, CancellationToken ct)
    {
        var justRegistered = TempData[JustRegisteredKey] is true;

        var card = await db.Users
            .AsNoTracking()
            .Where(u => u.Id == id)
            .Select(u => new IdCardViewModel
            {
                Id = u.Id,
                FullName = u.FullName,
                PmuId = u.PmuId,
                Major = u.Major,
                GithubHandle = u.GithubHandle,
                MemberSince = u.CreatedAt,
                QrCodeHash = u.QrCodeHash,
                JustRegistered = justRegistered,
            })
            .FirstOrDefaultAsync(ct);

        if (card is null)
        {
            return NotFound();
        }

        // Cards contain the member's check-in QR code: keep them out of search engines and shared caches.
        Response.Headers.CacheControl = "no-store";
        Response.Headers["X-Robots-Tag"] = "noindex, nofollow";
        return View(card);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error() =>
        View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
}
