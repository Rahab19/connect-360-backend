use connect360
GO

CREATE or alter PROCEDURE DeleteIncident
    @id VARCHAR(36)
AS
BEGIN
    DELETE FROM incidents WHERE id = @id
END
GO
