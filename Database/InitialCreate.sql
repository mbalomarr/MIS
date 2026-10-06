IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE TABLE [Events] (
        [Id] uniqueidentifier NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [Date] datetime2 NOT NULL,
        [Location] nvarchar(200) NOT NULL,
        [Type] nvarchar(16) NOT NULL,
        [Capacity] int NULL,
        CONSTRAINT [PK_Events] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE TABLE [Users] (
        [Id] uniqueidentifier NOT NULL,
        [PmuId] nvarchar(10) NOT NULL,
        [FullName] nvarchar(120) NOT NULL,
        [Email] nvarchar(180) NOT NULL,
        [Major] nvarchar(80) NOT NULL,
        [GithubHandle] nvarchar(39) NULL,
        [Role] nvarchar(16) NOT NULL,
        [QrCodeHash] nvarchar(64) NOT NULL,
        [CreatedAt] datetime2 NOT NULL DEFAULT (SYSUTCDATETIME()),
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE TABLE [Attendances] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [EventId] uniqueidentifier NOT NULL,
        [ScannedAt] datetime2 NOT NULL DEFAULT (SYSUTCDATETIME()),
        CONSTRAINT [PK_Attendances] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Attendances_Events_EventId] FOREIGN KEY ([EventId]) REFERENCES [Events] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Attendances_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE TABLE [Projects] (
        [Id] uniqueidentifier NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [RepoUrl] nvarchar(300) NOT NULL,
        [AuthorId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Projects] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Projects_Users_AuthorId] FOREIGN KEY ([AuthorId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Attendances_EventId] ON [Attendances] ([EventId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Attendances_UserId_EventId] ON [Attendances] ([UserId], [EventId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Events_Date] ON [Events] ([Date]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Projects_AuthorId] ON [Projects] ([AuthorId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Projects_RepoUrl] ON [Projects] ([RepoUrl]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Users_Email] ON [Users] ([Email]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Users_PmuId] ON [Users] ([PmuId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Users_QrCodeHash] ON [Users] ([QrCodeHash]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261006103958_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20261006103958_InitialCreate', N'8.0.31');
END;
GO

COMMIT;
GO

