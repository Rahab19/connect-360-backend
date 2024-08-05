USE connect360
GO
CREATE OR ALTER PROCEDURE updateFeedback
    @id VARCHAR(36),
    @title NVARCHAR(255),
    @description NVARCHAR(255)
    
AS
BEGIN
    UPDATE Feedback
    SET title = @title, description = @description, createdAt = GETDATE()
    WHERE id = @id;
END
GO