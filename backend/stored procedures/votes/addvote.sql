USE connect360
GO

CREATE OR ALTER PROCEDURE  addVote
  @pollId VARCHAR (36),
  @userId VARCHAR (36),
  @option BIT
AS
BEGIN
  INSERT INTO Votes (PollId, UserId, Option)
  VALUES (@pollId, @userId, @option);
END;
GO