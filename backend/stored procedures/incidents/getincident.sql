use connect360
go

CREATE or ALTER PROCEDURE GetIncident
    @id VARCHAR(36)
AS
BEGIN
    SELECT * FROM incidents WHERE id = @id
END
GO