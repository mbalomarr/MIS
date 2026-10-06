using Microsoft.EntityFrameworkCore;
using PmuMisHub.Models.Entities;

namespace PmuMisHub.Data;

/// <summary>EF Core context for the MIS Hub SQL Server database.</summary>
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<Attendance> Attendances => Set<Attendance>();
    public DbSet<Project> Projects => Set<Project>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(user =>
        {
            user.ToTable("Users");
            user.HasKey(u => u.Id);

            user.Property(u => u.PmuId).HasMaxLength(10).IsRequired();
            user.Property(u => u.FullName).HasMaxLength(120).IsRequired();
            user.Property(u => u.Email).HasMaxLength(180).IsRequired();
            user.Property(u => u.Major).HasMaxLength(80).IsRequired();
            user.Property(u => u.GithubHandle).HasMaxLength(39);
            user.Property(u => u.QrCodeHash).HasMaxLength(64).IsRequired();
            user.Property(u => u.Role).HasConversion<string>().HasMaxLength(16);
            user.Property(u => u.CreatedAt).HasDefaultValueSql("SYSUTCDATETIME()");

            user.HasIndex(u => u.PmuId).IsUnique();
            user.HasIndex(u => u.Email).IsUnique();
            user.HasIndex(u => u.QrCodeHash).IsUnique();
        });

        modelBuilder.Entity<Event>(evt =>
        {
            evt.ToTable("Events");
            evt.HasKey(e => e.Id);

            evt.Property(e => e.Title).HasMaxLength(200).IsRequired();
            evt.Property(e => e.Location).HasMaxLength(200).IsRequired();
            evt.Property(e => e.Type).HasConversion<string>().HasMaxLength(16);

            evt.HasIndex(e => e.Date);
        });

        modelBuilder.Entity<Attendance>(attendance =>
        {
            attendance.ToTable("Attendances");
            attendance.HasKey(a => a.Id);
            attendance.Property(a => a.ScannedAt).HasDefaultValueSql("SYSUTCDATETIME()");

            attendance.HasOne(a => a.User)
                .WithMany(u => u.Attendances)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            attendance.HasOne(a => a.Event)
                .WithMany(e => e.Attendances)
                .HasForeignKey(a => a.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            // A member can only be checked in to an event once.
            attendance.HasIndex(a => new { a.UserId, a.EventId }).IsUnique();
        });

        modelBuilder.Entity<Project>(project =>
        {
            project.ToTable("Projects");
            project.HasKey(p => p.Id);

            project.Property(p => p.Title).HasMaxLength(200).IsRequired();
            project.Property(p => p.RepoUrl).HasMaxLength(300).IsRequired();
            project.HasIndex(p => p.RepoUrl).IsUnique();

            project.HasOne(p => p.Author)
                .WithMany(u => u.Projects)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
