use connect360
go

CREATE or alter PROCEDURE GetIncidents
AS
BEGIN
    SELECT * FROM incidents
END
GO