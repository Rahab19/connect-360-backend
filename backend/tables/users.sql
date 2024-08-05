use connect360
GO

CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('citizen', 'admin', 'official')),
  isEmailSent BIT DEFAULT 0,
  isDeleted BIT DEFAULT 0,
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE()
)
select * from users