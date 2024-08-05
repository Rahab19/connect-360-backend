USE connect360
GO
CREATE TABLE incidents (
    id VARCHAR(36) PRIMARY KEY,
    usersid VARCHAR(36) NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    MediaUrl NVARCHAR(255),
    Status NVARCHAR(50) DEFAULT 'Open',
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usersid) REFERENCES users(id),
    ReportedBy NVARCHAR(100)
)
GO
SELECT * FROM incidents;