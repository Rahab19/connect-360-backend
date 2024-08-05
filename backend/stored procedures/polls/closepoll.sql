use connect360
go

CREATE or alter PROCEDURE ClosePoll
    @pollsid VARCHAR (36)
AS
BEGIN
    UPDATE polls
    SET is_active = 0, expires_at = GETDATE()
    WHERE id = @pollsid
END
GO