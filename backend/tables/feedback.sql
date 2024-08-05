USE connect360

CREATE TABLE Feedback(
    id VARCHAR(50) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    usersid VARCHAR(36) NOT NULL, 
    FOREIGN KEY (usersid) REFERENCES users(id)
)
GO
