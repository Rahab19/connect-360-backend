USE connect360
GO

CREATE OR ALTER PROCEDURE getVote
  @pollId  VARCHAR (36),
  @userId  VARCHAR (36)
AS
BEGIN
  SELECT * FROM Votes WHERE PollId = @pollId AND UserId = @userId;
END;
GO