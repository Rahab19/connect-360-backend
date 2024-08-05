USE connect360
GO

CREATE TABLE polls (
  id VARCHAR (36) PRIMARY KEY,
  title NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX),
  question NVARCHAR(255) NOT NULL,
  options NVARCHAR(MAX) NOT NULL,
  usersid VARCHAR (36) REFERENCES users(id),
  created_at DATETIME NOT NULL DEFAULT GETDATE(),
  updated_at DATETIME NOT NULL DEFAULT GETDATE(),
  expires_at DATETIME,
  is_active BIT NOT NULL DEFAULT 1,
  created_by VARCHAR(36) NOT NULL REFERENCES users(id)
);
