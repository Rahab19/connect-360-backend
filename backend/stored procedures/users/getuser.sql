USE connect360
GO
CREATE OR ALTER PROCEDURE getUser
    @id VARCHAR(36)
AS
BEGIN
    SELECT * FROM users WHERE id = @id AND isDeleted = 0;
END