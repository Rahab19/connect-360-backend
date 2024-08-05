use connect360
GO

CREATE or alter PROCEDURE UpdateIncident
    @id VARCHAR(36),
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @MediaUrl NVARCHAR(255),
    @Status NVARCHAR(50)
AS
BEGIN
    UPDATE incidents
    SET Title = @Title, Description = @Description, MediaUrl = @MediaUrl, Status = @Status
    WHERE id = @id
END
GO