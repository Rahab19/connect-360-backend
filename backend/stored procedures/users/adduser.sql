USE connect360
GO

CREATE OR ALTER PROCEDURE addUser
    @id VARCHAR(36),
    @name NVARCHAR(255),
    @email NVARCHAR(255),
    @password NVARCHAR(255),
    @role VARCHAR(10)
AS
BEGIN
    INSERT INTO users (id, name, email, password, role )
    VALUES (@id, @name, @email, @password, @role);
END
GO

