USE connect360
GO

CREATE OR ALTER PROCEDURE addFeedback
    @id VARCHAR(36),
    @title NVARCHAR(255),
    @description NVARCHAR(255),
    @usersid VARCHAR(36)

AS   
BEGIN
    INSERT INTO Feedback (id, title, description, usersid)
    VALUES (@id, @title, @description, @usersid);
END;
GO