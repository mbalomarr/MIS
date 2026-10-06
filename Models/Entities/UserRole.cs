namespace PmuMisHub.Models.Entities;

/// <summary>Site permissions. Admins manage events and scan attendance; members register and check in.</summary>
public enum UserRole
{
    Member = 0,
    Admin = 1,
}
