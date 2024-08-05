use connect360
GO

CREATE OR ALTER PROCEDURE GetPollResponses
    @pollsid VARCHAR (36)
AS
BEGIN
    SELECT * FROM poll_responses
    WHERE pollsid = @pollsid
    ORDER BY created_at DESC
END
GO