use connect360
GO

CREATE or alter PROCEDURE CreateIncident
    @id VARCHAR(36),
    @usersid VARCHAR(36),
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @MediaUrl NVARCHAR(255),
    @ReportedBy NVARCHAR(100)
AS
BEGIN
    INSERT INTO incidents (id, usersid, Title, Description, MediaUrl, ReportedBy)
    VALUES (@id,@usersid, @Title, @Description, @MediaUrl, @ReportedBy)
END
GO
