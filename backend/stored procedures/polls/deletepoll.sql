use connect360
GO

CREATE or ALTER PROCEDURE DeletePoll
    @pollsid VARCHAR (36)
AS
BEGIN
    DELETE FROM polls
    WHERE id = @pollsid
END
GO