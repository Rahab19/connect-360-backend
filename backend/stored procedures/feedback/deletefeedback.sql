USE connect360
GO
CREATE OR ALTER PROCEDURE deleteFeedback
    @id VARCHAR(36)
AS
BEGIN
    DELETE FROM  Feedback WHERE  id = @id;
END;