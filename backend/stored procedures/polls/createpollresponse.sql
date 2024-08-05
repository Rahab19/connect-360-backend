USE connect360
GO

CREATE OR ALTER PROCEDURE CreatePollResponse
    @pollsid VARCHAR (36) ,
    @usersid VARCHAR (36),
    @response nvarchar(max)
AS
BEGIN
    INSERT INTO poll_responses (pollsid, usersid, response, created_at)
    VALUES (@pollsid, @usersid, @response, GETDATE())

    SELECT SCOPE_IDENTITY() AS response_id
END
GO