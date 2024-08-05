use connect360
GO

CREATE or alter PROCEDURE GetPollResponseCount
    @pollid VARCHAR (36)
AS
BEGIN
    SELECT COUNT(*) AS response_count
    FROM poll_responses
    WHERE pollid = @pollid
END
GO