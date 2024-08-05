USE connect360
GO

CREATE OR ALTER PROCEDURE CreatePoll
    @title nvarchar(255),
    @description nvarchar(max),
    @question nvarchar(255),
    @options nvarchar(max)
AS
BEGIN
    INSERT INTO polls (title, description, question, options, created_at, updated_at)
    VALUES (@title, @description, @question, @options, GETDATE(), GETDATE())

    SELECT SCOPE_IDENTITY() AS poll_id
END
GO