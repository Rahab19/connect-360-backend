USE connect360
GO

CREATE OR ALTER PROCEDURE getPollResults
  @pollId VARCHAR (36)
AS
BEGIN
  SELECT 
    SUM(CASE WHEN Option = 1 THEN 1 ELSE 0 END) AS YesCount,
    SUM(CASE WHEN Option = 0 THEN 1 ELSE 0 END) AS NoCount
  FROM Votes
  WHERE PollId = @pollId;
END;
GO